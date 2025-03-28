import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormProgressBar from "@/components/FormProgressBar";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";
import FormActions from "@/components/technical-form/FormActions";
import { useFormProgress } from "@/hooks/useFormProgress";
import { systemDesignFormFields } from "@/constants/systemDesignFields";
import { useSystemDesignForm } from "@/hooks/useSystemDesignForm";
import HeatPumpSection from "@/components/system-design/HeatPumpSection";
import ElectricitySection from "@/components/system-design/ElectricitySection";
import RequirementsSection from "@/components/system-design/RequirementsSection";

export default function SystemDesignForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const {
    loading,
    project,
    formData,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit
  } = useSystemDesignForm(projectId);
  
  // Calculate form progress
  const progress = useFormProgress(systemDesignFormFields, formData);

  const handleCancel = () => {
    navigate(`/projects/${formData.project_id}`);
  };

  const onSubmit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);
    if (success) {
      navigate(`/projects/${formData.project_id}`);
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
          
          <form onSubmit={onSubmit} className="grid gap-4">
            <HeatPumpSection 
              heatPumpType={formData.heat_pump_type}
              heatingCapacityPlanned={formData.heating_capacity_planned}
              cop={formData.cop}
              estimatedSpf={formData.estimated_spf}
              heatSource={formData.heat_source}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />

            <ElectricitySection
              electricityTariff={formData.electricity_tariff}
              handleSelectChange={handleSelectChange}
            />

            <RequirementsSection
              spaceRequirementsMet={formData.space_requirements_met || false}
              soundRequirementsMet={formData.sound_requirements_met || false}
              permissionsRequired={formData.permissions_required}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectChange={handleSelectChange}
            />

            <FormActions loading={loading} onCancel={handleCancel} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
