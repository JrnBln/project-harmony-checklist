import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Operation, ProjectExtended } from "@/types/supabase";
import FormProgressBar from "@/components/FormProgressBar";
import { useFormProgress, FormField } from "@/hooks/useFormProgress";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";

const formFields: FormField[] = [
  { name: "maintenance_contract_signed" },
  { name: "monitoring_active" },
  { name: "spf_realized_first_year" },
  { name: "fault_messages" },
];

export default function OperationForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectExtended | null>(null);
  const [formData, setFormData] = useState<Partial<Operation>>({
    project_id: projectId || "",
    maintenance_contract_signed: false,
    monitoring_active: false,
    spf_realized_first_year: undefined,
    fault_messages: "",
  });

  const progress = useFormProgress(formData, formFields);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchOperationData();
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
        setProject(data as unknown as ProjectExtended);
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

  const fetchOperationData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("operation")
        .select("*")
        .eq("project_id", projectId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching operation data:", error);
      toast({
        title: "Fehler",
        description: "Betriebsdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: existingData } = await supabase
        .from("operation")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      let response;

      if (existingData) {
        response = await supabase
          .from("operation")
          .update(formData)
          .eq("id", existingData.id);
      } else {
        response = await supabase
          .from("operation")
          .insert([formData])
          .select();
      }

      if (response.error) throw response.error;

      toast({
        title: "Erfolg",
        description: "Betriebsdaten erfolgreich gespeichert",
      });

      navigate(`/projects/${formData.project_id}`);
    } catch (error) {
      console.error("Error saving operation data:", error);
      toast({
        title: "Fehler",
        description: "Betriebsdaten konnten nicht gespeichert werden.",
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
      {project && <ProjectPhaseNav projectId={project.id} activePhase="operation" />}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Betriebsüberwachung</CardTitle>
          {project && (
            <p className="text-sm text-muted-foreground">
              Projekt: {project.name}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <FormProgressBar progress={progress} className="mb-6" />
          
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maintenance_contract_signed"
                  checked={formData.maintenance_contract_signed}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("maintenance_contract_signed", checked === true)
                  }
                />
                <Label htmlFor="maintenance_contract_signed">Wartungsvertrag abgeschlossen</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="monitoring_active"
                  checked={formData.monitoring_active}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("monitoring_active", checked === true)
                  }
                />
                <Label htmlFor="monitoring_active">Monitoring aktiv</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spf_realized_first_year">JAZ realisiert im 1. Jahr</Label>
              <Input
                id="spf_realized_first_year"
                name="spf_realized_first_year"
                type="number"
                step="0.1"
                min="0"
                value={formData.spf_realized_first_year || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fault_messages">Störmeldungen</Label>
              <Textarea
                id="fault_messages"
                name="fault_messages"
                rows={4}
                placeholder="Störmeldungen und Probleme im Betrieb"
                value={formData.fault_messages || ""}
                onChange={handleChange}
              />
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
