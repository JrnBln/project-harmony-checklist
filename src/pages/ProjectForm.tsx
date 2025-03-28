
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ProjectExtended, BuildingType, RenovationStatus, EnergySource } from "@/types/supabase";

const buildingTypes: BuildingType[] = ["EFH", "MFH", "Gewerbe", "Industrie"];
const renovationStatuses: RenovationStatus[] = ["unsaniert", "teilsaniert", "vollsaniert"];
const energySources: EnergySource[] = ["Gas", "Öl", "Fernwärme", "Strom", "Sonstiges"];

export default function ProjectForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ProjectExtended>>({
    name: "",
    location: "",
    client: "",
    manager: "",
    status: "Geplant",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split("T")[0],
    notes: "",
    building_type: undefined,
    construction_year: undefined,
    renovation_status: undefined,
    previous_energy_source: undefined,
    project_goal: "",
  });

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Fehler",
        description: "Projekt konnte nicht geladen werden.",
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
      [name]: type === "number" ? (value ? parseInt(value) : undefined) : value,
    });
  };

  const handleSelectChange = (name: string, value: string | undefined) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (projectId) {
        // Update existing project
        response = await supabase
          .from("projects")
          .update(formData)
          .eq("id", projectId);
      } else {
        // Create new project
        response = await supabase
          .from("projects")
          .insert([formData])
          .select();
      }

      if (response.error) throw response.error;

      toast({
        title: "Erfolg",
        description: projectId
          ? "Projekt erfolgreich aktualisiert"
          : "Projekt erfolgreich erstellt",
      });

      if (!projectId && response.data) {
        // Navigate to the newly created project
        navigate(`/projects/${response.data[0].id}`);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Fehler",
        description: "Projekt konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-6">
      <CardHeader>
        <CardTitle>{projectId ? "Projekt bearbeiten" : "Neues Projekt"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Projektname</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Standort</Label>
              <Input
                id="location"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Kunde</Label>
              <Input
                id="client"
                name="client"
                value={formData.client || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Projektleiter</Label>
              <Input
                id="manager"
                name="manager"
                value={formData.manager || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status wählen" />
                </SelectTrigger>
                <SelectContent>
                  {["Geplant", "In Umsetzung", "Abgeschlossen", "Pausiert"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Startdatum</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Enddatum</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="building_type">Gebäudetyp</Label>
              <Select
                value={formData.building_type}
                onValueChange={(value) => handleSelectChange("building_type", value)}
              >
                <SelectTrigger id="building_type">
                  <SelectValue placeholder="Gebäudetyp wählen" />
                </SelectTrigger>
                <SelectContent>
                  {buildingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="construction_year">Baujahr</Label>
              <Input
                id="construction_year"
                name="construction_year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.construction_year || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="renovation_status">Sanierungsstand</Label>
              <Select
                value={formData.renovation_status}
                onValueChange={(value) => handleSelectChange("renovation_status", value)}
              >
                <SelectTrigger id="renovation_status">
                  <SelectValue placeholder="Sanierungsstand wählen" />
                </SelectTrigger>
                <SelectContent>
                  {renovationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous_energy_source">Energieträger bisher</Label>
              <Select
                value={formData.previous_energy_source}
                onValueChange={(value) => handleSelectChange("previous_energy_source", value)}
              >
                <SelectTrigger id="previous_energy_source">
                  <SelectValue placeholder="Energieträger wählen" />
                </SelectTrigger>
                <SelectContent>
                  {energySources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_goal">Projektziel</Label>
            <Textarea
              id="project_goal"
              name="project_goal"
              rows={3}
              value={formData.project_goal || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Abbrechen
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
