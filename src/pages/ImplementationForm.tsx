
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Implementation, ProjectExtended } from "@/types/supabase";
import FormProgressBar from "@/components/FormProgressBar";
import { useFormProgress, FormField } from "@/hooks/useFormProgress";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";

// Define form fields for progress calculation
const formFields: FormField[] = [
  { name: "construction_progress_documented" },
  { name: "handover_protocol_file" },
  { name: "commissioning_protocol_file" },
  { name: "regulation_performed" },
  { name: "customer_instruction_done" },
  { name: "monitoring_activated" },
  { name: "heat_meter_data" },
  { name: "electricity_meter_data" },
];

export default function ImplementationForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectExtended | null>(null);
  const [formData, setFormData] = useState<Partial<Implementation>>({
    project_id: projectId || "",
    construction_progress_documented: false,
    handover_protocol_file: "",
    commissioning_protocol_file: "",
    regulation_performed: false,
    customer_instruction_done: false,
    monitoring_activated: false,
    heat_meter_data: undefined,
    electricity_meter_data: undefined,
  });

  // Calculate form progress
  const progress = useFormProgress(formData, formFields);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchImplementationData();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) throw error;
      if (data) {
        setProject(data as ProjectExtended);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Fehler",
        description: "Projekt konnte nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  const fetchImplementationData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("implementation")
        .select("*")
        .eq("project_id", projectId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching implementation data:", error);
      toast({
        title: "Fehler",
        description: "Umsetzungsdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "number" ? (value ? parseFloat(value) : undefined) : value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileName = `${projectId}/${name}_${Date.now()}`;
    
    setLoading(true);
    try {
      const { error: uploadError, data } = await supabase.storage
        .from('project_documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project_documents')
        .getPublicUrl(fileName);

      setFormData({
        ...formData,
        [name]: publicUrl,
      });
      
      toast({
        title: "Erfolg",
        description: "Datei erfolgreich hochgeladen.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Fehler",
        description: "Datei konnte nicht hochgeladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if record already exists
      const { data: existingData } = await supabase
        .from("implementation")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      let response;

      if (existingData) {
        // Update existing record
        response = await supabase
          .from("implementation")
          .update(formData)
          .eq("id", existingData.id);
      } else {
        // Create new record
        response = await supabase
          .from("implementation")
          .insert([formData])
          .select();
      }

      if (response.error) throw response.error;

      toast({
        title: "Erfolg",
        description: "Umsetzungsdaten erfolgreich gespeichert",
      });

      navigate(`/projects/${formData.project_id}`);
    } catch (error) {
      console.error("Error saving implementation data:", error);
      toast({
        title: "Fehler",
        description: "Umsetzungsdaten konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!projectId) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p>Kein Projekt ausgewählt.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Zurück zur Übersicht
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {project && <ProjectPhaseNav projectId={project.id} activePhase="implementation" />}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Baufortschritt & Inbetriebnahme</CardTitle>
          {project && (
            <p className="text-sm text-muted-foreground">
              Projekt: {project.name}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <FormProgressBar progress={progress} className="mb-6" />
          
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="construction_progress_documented"
                checked={formData.construction_progress_documented}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("construction_progress_documented", checked === true)
                }
              />
              <Label htmlFor="construction_progress_documented">Baufortschritt dokumentiert</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="handover_protocol_file">Übergabeprotokoll</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="handover_protocol_file"
                  name="handover_protocol_file"
                  type="file"
                  className="flex-1"
                  onChange={handleFileChange}
                />
                {formData.handover_protocol_file && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formData.handover_protocol_file, '_blank')}
                  >
                    Anzeigen
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissioning_protocol_file">Inbetriebnahmeprotokoll</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="commissioning_protocol_file"
                  name="commissioning_protocol_file"
                  type="file"
                  className="flex-1"
                  onChange={handleFileChange}
                />
                {formData.commissioning_protocol_file && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formData.commissioning_protocol_file, '_blank')}
                  >
                    Anzeigen
                  </Button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="regulation_performed"
                  checked={formData.regulation_performed}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("regulation_performed", checked === true)
                  }
                />
                <Label htmlFor="regulation_performed">Einregulierung durchgeführt</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customer_instruction_done"
                  checked={formData.customer_instruction_done}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("customer_instruction_done", checked === true)
                  }
                />
                <Label htmlFor="customer_instruction_done">Kundeneinweisung erfolgt</Label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="monitoring_activated"
                checked={formData.monitoring_activated}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("monitoring_activated", checked === true)
                }
              />
              <Label htmlFor="monitoring_activated">Monitoring aktiviert</Label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heat_meter_data">Zählerdaten Wärme</Label>
                <Input
                  id="heat_meter_data"
                  name="heat_meter_data"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.heat_meter_data || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="electricity_meter_data">Zählerdaten Strom</Label>
                <Input
                  id="electricity_meter_data"
                  name="electricity_meter_data"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.electricity_meter_data || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/projects/${formData.project_id}`)}
                disabled={loading}
              >
                Zurück zum Projekt
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Speichern..." : "Speichern"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
