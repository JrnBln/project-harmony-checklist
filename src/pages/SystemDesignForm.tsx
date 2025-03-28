
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  SystemDesign, 
  HeatPumpType, 
  HeatSource, 
  ElectricityTariff, 
  PermissionStatus, 
  ProjectExtended 
} from "@/types/supabase";
import FormProgressBar from "@/components/FormProgressBar";
import { useFormProgress, FormField } from "@/hooks/useFormProgress";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";

const heatPumpTypes: HeatPumpType[] = ["Luft/Wasser", "Sole/Wasser", "Wasser/Wasser"];
const heatSources: HeatSource[] = ["Luft", "Erdkollektor", "Erdsonde", "Grundwasser", "Abwasser", "Abwärme"];
const electricityTariffs: ElectricityTariff[] = ["HT/NT", "PV", "Direktverbrauch", "Dynamisch"];
const permissionStatuses: PermissionStatus[] = ["Ja", "Nein", "Unklar"];

// Define form fields for progress calculation
const formFields: FormField[] = [
  { name: "heat_pump_type", required: true },
  { name: "heating_capacity_planned", required: true },
  { name: "cop" },
  { name: "estimated_spf" },
  { name: "heat_source", required: true },
  { name: "electricity_tariff" },
  { name: "space_requirements_met" },
  { name: "sound_requirements_met" },
  { name: "permissions_required" },
];

export default function SystemDesignForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectExtended | null>(null);
  const [formData, setFormData] = useState<Partial<SystemDesign>>({
    project_id: projectId || "",
    heat_pump_type: undefined,
    heating_capacity_planned: undefined,
    cop: undefined,
    estimated_spf: undefined,
    heat_source: undefined,
    electricity_tariff: undefined,
    space_requirements_met: false,
    sound_requirements_met: false,
    permissions_required: undefined,
  });

  // Calculate form progress
  const progress = useFormProgress(formData, formFields);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchSystemDesign();
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

  const fetchSystemDesign = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("system_design")
        .select("*")
        .eq("project_id", projectId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching system design:", error);
      toast({
        title: "Fehler",
        description: "Auslegungsdaten konnten nicht geladen werden.",
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

  const handleSelectChange = (name: string, value: string | undefined) => {
    setFormData({
      ...formData,
      [name]: value,
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
      // Check if record already exists
      const { data: existingData } = await supabase
        .from("system_design")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      let response;

      if (existingData) {
        // Update existing record
        response = await supabase
          .from("system_design")
          .update(formData)
          .eq("id", existingData.id);
      } else {
        // Create new record
        response = await supabase
          .from("system_design")
          .insert([formData])
          .select();
      }

      if (response.error) throw response.error;

      toast({
        title: "Erfolg",
        description: "Auslegungsdaten erfolgreich gespeichert",
      });

      navigate(`/projects/${formData.project_id}`);
    } catch (error) {
      console.error("Error saving system design:", error);
      toast({
        title: "Fehler",
        description: "Auslegungsdaten konnten nicht gespeichert werden.",
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
      {project && <ProjectPhaseNav projectId={project.id} activePhase="design" />}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Planung & Systemwahl</CardTitle>
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
              <div className="space-y-2">
                <Label htmlFor="heat_pump_type">Wärmepumpentyp</Label>
                <Select
                  value={formData.heat_pump_type}
                  onValueChange={(value) => handleSelectChange("heat_pump_type", value)}
                >
                  <SelectTrigger id="heat_pump_type">
                    <SelectValue placeholder="Wärmepumpentyp auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {heatPumpTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heat_source">Wärmequelle</Label>
                <Select
                  value={formData.heat_source}
                  onValueChange={(value) => handleSelectChange("heat_source", value)}
                >
                  <SelectTrigger id="heat_source">
                    <SelectValue placeholder="Wärmequelle auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {heatSources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heating_capacity_planned">Heizleistung geplant (kW)</Label>
                <Input
                  id="heating_capacity_planned"
                  name="heating_capacity_planned"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.heating_capacity_planned || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cop">COP</Label>
                <Input
                  id="cop"
                  name="cop"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.cop || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_spf">JAZ geschätzt</Label>
                <Input
                  id="estimated_spf"
                  name="estimated_spf"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.estimated_spf || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="electricity_tariff">Stromtarifmodell</Label>
              <Select
                value={formData.electricity_tariff}
                onValueChange={(value) => handleSelectChange("electricity_tariff", value)}
              >
                <SelectTrigger id="electricity_tariff">
                  <SelectValue placeholder="Stromtarifmodell auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {electricityTariffs.map((tariff) => (
                    <SelectItem key={tariff} value={tariff}>
                      {tariff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="space_requirements_met"
                  checked={formData.space_requirements_met}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("space_requirements_met", checked === true)
                  }
                />
                <Label htmlFor="space_requirements_met">Platzbedarf erfüllt</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sound_requirements_met"
                  checked={formData.sound_requirements_met}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("sound_requirements_met", checked === true)
                  }
                />
                <Label htmlFor="sound_requirements_met">Schallanforderungen erfüllt</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permissions_required">Genehmigungen erforderlich</Label>
              <Select
                value={formData.permissions_required}
                onValueChange={(value) => handleSelectChange("permissions_required", value)}
              >
                <SelectTrigger id="permissions_required">
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {permissionStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
