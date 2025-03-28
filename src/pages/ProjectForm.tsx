
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ProjectExtended } from "@/types/supabase";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";

// Import form section components
import GeneralProjectDataSection from "@/components/project-form/GeneralProjectDataSection";
import ProjectStatusSection from "@/components/project-form/ProjectStatusSection";
import ClientInfoSection from "@/components/project-form/ClientInfoSection";
import NotesSection from "@/components/project-form/NotesSection";
import FormActions from "@/components/project-form/FormActions";

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
    startdate: new Date().toISOString().split("T")[0],
    enddate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split("T")[0],
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

      if (!formData.name || formData.name.trim() === '') {
        throw new Error("Projektname ist erforderlich");
      }

      // Create a data object that definitely has the required name field
      const projectData = {
        ...formData,
        name: formData.name // Ensure this is present and not optional
      };

      if (projectId) {
        response = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", projectId);
      } else {
        response = await supabase
          .from("projects")
          .insert([projectData]) // Use array format for insert
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
        navigate(`/projects/${response.data[0].id}`);
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Projekt konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {projectId && (
        <ProjectPhaseNav projectId={projectId} activePhase="overview" />
      )}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{projectId ? "Projekt bearbeiten" : "Neues Projekt"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Allgemeine Projektdaten */}
            <GeneralProjectDataSection 
              formData={formData} 
              handleChange={handleChange} 
              handleSelectChange={handleSelectChange} 
            />
            
            {/* Projektverantwortliche */}
            <ClientInfoSection 
              formData={formData}
              handleChange={handleChange}
            />
            
            {/* Projektstatus */}
            <ProjectStatusSection 
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />

            {/* Notizen */}
            <NotesSection 
              notes={formData.notes}
              handleChange={handleChange}
            />

            {/* Form Actions */}
            <FormActions 
              loading={loading}
              onCancel={() => navigate(-1)}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
