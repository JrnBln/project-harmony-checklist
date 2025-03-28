import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormProgressBar from "@/components/FormProgressBar";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";
import FormActions from "@/components/technical-form/FormActions";
import { useFormProgress } from "@/hooks/useFormProgress";
import { implementationFormFields } from "@/constants/implementationFormFields";
import { useImplementationForm } from "@/hooks/useImplementationForm";
import ConstructionSection from "@/components/implementation/ConstructionSection";
import DocumentsSection from "@/components/implementation/DocumentsSection";
import CommissioningSection from "@/components/implementation/CommissioningSection";
import MeterDataSection from "@/components/implementation/MeterDataSection";

export default function ImplementationForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const {
    loading,
    project,
    formData,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit
  } = useImplementationForm(projectId);

  // Calculate form progress
  const progress = useFormProgress(implementationFormFields, formData);

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
      {project && <ProjectPhaseNav projectId={project.id} activePhase="implementation" />}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Baufortschritt & Inbetriebnahme</CardTitle>
          {project && (
            <p className="text-sm text-muted-foreground">
              Projekt: {project.name}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <FormProgressBar progress={progress} className="mb-6" />
          
          <form onSubmit={onSubmit} className="grid gap-4">
            <ConstructionSection
              constructionProgressDocumented={formData.construction_progress_documented || false}
              handleCheckboxChange={handleCheckboxChange}
            />

            <DocumentsSection
              handoverProtocolFile={formData.handover_protocol_file}
              commissioningProtocolFile={formData.commissioning_protocol_file}
              handleFileChange={handleFileChange}
            />

            <CommissioningSection
              regulationPerformed={formData.regulation_performed || false}
              customerInstructionDone={formData.customer_instruction_done || false}
              monitoringActivated={formData.monitoring_activated || false}
              handleCheckboxChange={handleCheckboxChange}
            />

            <MeterDataSection
              heatMeterData={formData.heat_meter_data}
              electricityMeterData={formData.electricity_meter_data}
              handleChange={handleChange}
            />

            <FormActions loading={loading} onCancel={handleCancel} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
