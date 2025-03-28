
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SystemDesign, ProjectExtended } from "@/types/supabase";

export function useSystemDesignForm(projectId: string | undefined) {
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
      const { data: existingData } = await supabase
        .from("system_design")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      let response;

      if (existingData) {
        response = await supabase
          .from("system_design")
          .update(formData)
          .eq("id", existingData.id);
      } else {
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

      return true;
    } catch (error) {
      console.error("Error saving system design:", error);
      toast({
        title: "Fehler",
        description: "Auslegungsdaten konnten nicht gespeichert werden.",
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
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit
  };
}
