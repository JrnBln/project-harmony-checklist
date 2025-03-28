
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProjectExtended, Implementation } from "@/types/supabase";
import { useFormProgress, FieldConfig } from "@/hooks/useFormProgress";
import { implementationFormFields } from "@/constants/implementationFormFields";

export function useImplementationForm(projectId: string | undefined) {
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

  // Use the proper hook import
  const progress = useFormProgress(implementationFormFields, formData);

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
        description: "Implementierungsdaten konnten nicht geladen werden.",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement file handling here
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      // For now, just store the file name
      // In a real implementation, you would upload the file to a server
      setFormData({
        ...formData,
        [name]: files[0].name,
      });
    }
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
        .from("implementation")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      let response;

      if (existingData) {
        response = await supabase
          .from("implementation")
          .update(formData)
          .eq("id", existingData.id);
      } else {
        response = await supabase
          .from("implementation")
          .insert([formData])
          .select();
      }

      if (response.error) throw response.error;

      // Update project progress in projects table
      await updateProjectProgress();

      toast({
        title: "Erfolg",
        description: "Implementierungsdaten erfolgreich gespeichert",
      });

      return true;
    } catch (error) {
      console.error("Error saving implementation data:", error);
      toast({
        title: "Fehler",
        description: "Implementierungsdaten konnten nicht gespeichert werden.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProjectProgress = async () => {
    try {
      // Calculate current progress based on filled fields
      
      // Update project progress if projectId exists and progress is calculated
      if (projectId && progress > 0) {
        await supabase
          .from("projects")
          .update({ progress: Math.round(progress) })
          .eq("id", projectId);
      }
    } catch (error) {
      console.error("Error updating project progress:", error);
    }
  };

  return {
    loading,
    project,
    formData,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit,
    progress
  };
}
