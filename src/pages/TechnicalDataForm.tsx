
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechnicalData, ProjectExtended } from "@/types/supabase";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";
import FormProgressBar from "@/components/FormProgressBar";

// Import form section components
import ProjectSelectSection from "@/components/technical-form/ProjectSelectSection";
import BuildingDataSection from "@/components/technical-form/BuildingDataSection";
import HeatingSystemSection from "@/components/technical-form/HeatingSystemSection";
import SpaceAndAccessSection from "@/components/technical-form/SpaceAndAccessSection";
import NotesSection from "@/components/technical-form/NotesSection";
import FormActions from "@/components/technical-form/FormActions";
import { useFormProgress } from "@/hooks/useFormProgress";

export default function TechnicalDataForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    notes: "",
  });

  // Fetch projects for the dropdown
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as ProjectExtended[];
    },
  });

  // Fetch technical data if projectId is provided
  useEffect(() => {
    if (projectId) {
      fetchTechnicalData();
    }
  }, [projectId]);

  // Calculate form progress
  const formFields = [
    { name: "project_id", required: true },
    { name: "heating_load_calculated" },
    { name: "heat_demand_estimated" },
    { name: "number_of_units" },
    { name: "heating_surfaces" },
    { name: "buffer_tank_available" },
    { name: "hot_water_integrated" },
    { name: "grid_connection_capacity" },
    { name: "three_phase_connection" },
    { name: "indoor_unit_space_available" },
    { name: "outdoor_unit_space_available" },
    { name: "drill_access" },
  ];
  
  const progress = useFormProgress(formFields, formData);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (!formData.project_id) {
        throw new Error("Projekt muss ausgewählt werden");
      }

      // Check if technical data already exists for this project
      const { data: existingData, error: checkError } = await supabase
        .from("technical_data")
        .select("id")
        .eq("project_id", formData.project_id)
        .maybeSingle();

      if (checkError) throw checkError;

      let response;

      if (existingData) {
        // Update existing record
        response = await supabase
          .from("technical_data")
          .update(formData)
          .eq("id", existingData.id);
      } else {
        // Insert new record
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

      // Navigate back to project detail page
      navigate(`/projects/${formData.project_id}`);
    } catch (error) {
      console.error("Error saving technical data:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Technische Daten konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {projectId && (
        <ProjectPhaseNav projectId={projectId} activePhase="technical" />
      )}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Technische Daten</CardTitle>
          <FormProgressBar progress={progress} label="VDI 4645 Bestandsanalyse" />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project selection */}
            <ProjectSelectSection
              projectId={formData.project_id || ""}
              projects={projects}
              disabled={!!projectId || loading}
              handleSelectChange={handleSelectChange}
            />
            
            {/* Building data section */}
            <BuildingDataSection 
              heatingLoadCalculated={formData.heating_load_calculated}
              heatDemandEstimated={formData.heat_demand_estimated}
              numberOfUnits={formData.number_of_units}
              heatingSurfaces={formData.heating_surfaces}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
            
            {/* Heating system section */}
            <HeatingSystemSection
              bufferTankAvailable={formData.buffer_tank_available || false}
              hotWaterIntegrated={formData.hot_water_integrated || false}
              gridConnectionCapacity={formData.grid_connection_capacity}
              threePhasedConnection={formData.three_phase_connection || false}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
            />
            
            {/* Space and access section */}
            <SpaceAndAccessSection
              indoorUnitSpaceAvailable={formData.indoor_unit_space_available || false}
              outdoorUnitSpaceAvailable={formData.outdoor_unit_space_available || false}
              drillAccess={formData.drill_access}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectChange={handleSelectChange}
            />
            
            {/* Notes section */}
            <NotesSection
              notes={formData.notes}
              handleChange={handleChange}
            />
            
            {/* Form actions */}
            <FormActions
              loading={loading}
              onCancel={() => navigate(projectId ? `/projects/${projectId}` : "/projects")}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
