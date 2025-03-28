
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Implementation, ProjectExtended } from "@/types/supabase";

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

      toast({
        title: "Erfolg",
        description: "Umsetzungsdaten erfolgreich gespeichert",
      });

      return true;
    } catch (error) {
      console.error("Error saving implementation data:", error);
      toast({
        title: "Fehler",
        description: "Umsetzungsdaten konnten nicht gespeichert werden.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    project,
    formData,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit
  };
}
