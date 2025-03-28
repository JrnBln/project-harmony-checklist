
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Operation, ProjectExtended } from '@/types/supabase';
import { toast } from 'sonner';
import { useFormProgress } from './useFormProgress';
import { operationFormFields } from '@/constants/operationFormFields';

export function useOperationForm(projectId: string | undefined) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectExtended | null>(null);
  const [formData, setFormData] = useState<Partial<Operation>>({
    project_id: projectId,
    monitoring_active: false,
    maintenance_schedule_set: false,
    remote_access_configured: false,
  });

  // Form progress calculation
  const progress = useFormProgress(operationFormFields, formData);

  // Fetch project data
  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchOperationData();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        toast.error('Fehler beim Laden des Projekts');
        return;
      }

      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Fehler beim Laden des Projekts');
    }
  };

  const fetchOperationData = async () => {
    try {
      const { data, error } = await supabase
        .from('operations')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          console.error('Error fetching operation data:', error);
          toast.error('Fehler beim Laden der Betriebsdaten');
        }
        return;
      }

      if (data) {
        setFormData({
          ...data,
          project_id: projectId
        });
      }
    } catch (error) {
      console.error('Error fetching operation data:', error);
      toast.error('Fehler beim Laden der Betriebsdaten');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if operation data already exists
      const { data: existingData, error: checkError } = await supabase
        .from('operations')
        .select('id')
        .eq('project_id', projectId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing data:', checkError);
        toast.error('Fehler beim Speichern der Daten');
        setLoading(false);
        return false;
      }

      let result;

      if (existingData) {
        // Update existing record
        result = await supabase
          .from('operations')
          .update(formData)
          .eq('id', existingData.id);
      } else {
        // Insert new record
        result = await supabase
          .from('operations')
          .insert(formData);
      }

      if (result.error) {
        console.error('Error saving operation data:', result.error);
        toast.error('Fehler beim Speichern der Daten');
        setLoading(false);
        return false;
      }

      toast.success('Betriebsdaten erfolgreich gespeichert');
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error saving operation data:', error);
      toast.error('Fehler beim Speichern der Daten');
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    project,
    formData,
    progress,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit
  };
}
