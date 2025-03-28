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
import { TechnicalData, HeatingSurface, DrillAccess, ProjectExtended } from "@/types/supabase";

const heatingSurfaces: HeatingSurface[] = ["Radiatoren", "FBH", "Wandheizung", "Gemischt"];
const drillAccesses: DrillAccess[] = ["möglich", "eingeschränkt", "nicht möglich"];

export default function TechnicalDataForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectExtended[]>([]);
  const [formData, setFormData] = useState<Partial<TechnicalData>>({
    project_id: projectId || "",
    heating_load_calculated: undefined,
    heat_demand_estimated: undefined,
    number_of_units: undefined,
    heating_surfaces: undefined,
    buffer_tank_available: false,
    hot_water_integrated: false,
    grid_connection_capacity: undefined,
    three_phase_connection: false,
    indoor_unit_space_available: false,
    outdoor_unit_space_available: false,
    drill_access: undefined,
  });

  useEffect(() => {
    fetchProjects();
    if (projectId) {
      fetchTechnicalData();
    }
  }, [projectId]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("name");

      if (error) throw error;
      if (data) {
        setProjects(data as unknown as ProjectExtended[]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Fehler",
        description: "Projekte konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  const fetchTechnicalData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("technical_data")
        .select("*")
        .eq("project_id", projectId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching technical data:", error);
      toast({
        title: "Fehler",
        description: "Technische Daten konnten nicht geladen werden.",
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
        .from("technical_data")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      let response;

      if (existingData) {
        // Update existing record
        response = await supabase
          .from("technical_data")
          .update(formData)
          .eq("id", existingData.id);
      } else {
        // Create new record
        response = await supabase
          .from("technical_data")
          .insert([formData])
          .select();
      }

      if (response.error) throw response.error;

      toast({
        title: "Erfolg",
        description: "Technische Daten erfolgreich gespeichert",
      });

      navigate(`/projects/${formData.project_id}`);
    } catch (error) {
      console.error("Error saving technical data:", error);
      toast({
        title: "Fehler",
        description: "Technische Daten konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-6">
      <CardHeader>
        <CardTitle>Technische Bestandsaufnahme</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="project_id">Projekt</Label>
            <Select
              value={formData.project_id}
              onValueChange={(value) => handleSelectChange("project_id", value)}
              disabled={!!projectId}
            >
              <SelectTrigger id="project_id">
                <SelectValue placeholder="Projekt auswählen" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heating_load_calculated">Heizlast berechnet (kW)</Label>
              <Input
                id="heating_load_calculated"
                name="heating_load_calculated"
                type="number"
                step="0.1"
                min="0"
                value={formData.heating_load_calculated || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heat_demand_estimated">Wärmebedarf geschätzt (kWh/a)</Label>
              <Input
                id="heat_demand_estimated"
                name="heat_demand_estimated"
                type="number"
                step="100"
                min="0"
                value={formData.heat_demand_estimated || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number_of_units">Anzahl Wohneinheiten</Label>
              <Input
                id="number_of_units"
                name="number_of_units"
                type="number"
                min="1"
                value={formData.number_of_units || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heating_surfaces">Heizflächen vorhanden</Label>
              <Select
                value={formData.heating_surfaces}
                onValueChange={(value) => handleSelectChange("heating_surfaces", value)}
              >
                <SelectTrigger id="heating_surfaces">
                  <SelectValue placeholder="Heizflächen auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {heatingSurfaces.map((surface) => (
                    <SelectItem key={surface} value={surface}>
                      {surface}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="buffer_tank_available"
                checked={formData.buffer_tank_available}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("buffer_tank_available", checked === true)
                }
              />
              <Label htmlFor="buffer_tank_available">Pufferspeicher vorhanden</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hot_water_integrated"
                checked={formData.hot_water_integrated}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("hot_water_integrated", checked === true)
                }
              />
              <Label htmlFor="hot_water_integrated">Warmwasserbereitung integriert</Label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grid_connection_capacity">Netzanschlussleistung (kW)</Label>
              <Input
                id="grid_connection_capacity"
                name="grid_connection_capacity"
                type="number"
                step="0.1"
                min="0"
                value={formData.grid_connection_capacity || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="three_phase_connection"
                checked={formData.three_phase_connection}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("three_phase_connection", checked === true)
                }
              />
              <Label htmlFor="three_phase_connection">3-phasiger Hausanschluss</Label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="indoor_unit_space_available"
                checked={formData.indoor_unit_space_available}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("indoor_unit_space_available", checked === true)
                }
              />
              <Label htmlFor="indoor_unit_space_available">Platz für Inneneinheit vorhanden</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="outdoor_unit_space_available"
                checked={formData.outdoor_unit_space_available}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("outdoor_unit_space_available", checked === true)
                }
              />
              <Label htmlFor="outdoor_unit_space_available">Platz für Außeneinheit vorhanden</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="drill_access">Zugang für Bohrgerät</Label>
            <Select
              value={formData.drill_access}
              onValueChange={(value) => handleSelectChange("drill_access", value)}
            >
              <SelectTrigger id="drill_access">
                <SelectValue placeholder="Zugangsmöglichkeit auswählen" />
              </SelectTrigger>
              <SelectContent>
                {drillAccesses.map((access) => (
                  <SelectItem key={access} value={access}>
                    {access}
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
  );
}
