import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormProgressBar from "@/components/FormProgressBar";
import ProjectPhaseNav from "@/components/ProjectPhaseNav";
import FormActions from "@/components/technical-form/FormActions";
import { useFormProgress } from "@/hooks/useFormProgress";
import { operationFormFields } from "@/constants/operationFormFields";
import { useOperationForm } from "@/hooks/useOperationForm";
import PerformanceSection from "@/components/operation/PerformanceSection";
import MonitoringSection from "@/components/operation/MonitoringSection";
import MaintenanceSection from "@/components/operation/MaintenanceSection";

export default function OperationForm() {
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
  } = useOperationForm(projectId);

  // Calculate form progress
  const progress = useFormProgress(operationFormFields, formData);

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
      {project && <ProjectPhaseNav projectId={project.id} activePhase="operation" />}
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Betrieb & Wartung</CardTitle>
          {project && (
            <p className="text-sm text-muted-foreground">
              Projekt: {project.name}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <FormProgressBar progress={progress} className="mb-6" />
          
          <form onSubmit={onSubmit} className="grid gap-4">
            <PerformanceSection 
              measuredSpf={formData.measured_spf}
              measuredCop={formData.measured_cop}
              performanceAsExpected={formData.performance_as_expected}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />

            <MonitoringSection
              monitoringActive={formData.monitoring_active || false}
              monitoringSystem={formData.monitoring_system}
              remoteAccessConfigured={formData.remote_access_configured || false}
              handleCheckboxChange={handleCheckboxChange}
              handleChange={handleChange}
            />

            <MaintenanceSection
              maintenanceScheduleSet={formData.maintenance_schedule_set || false}
              nextMaintenanceDate={formData.next_maintenance_date}
              maintenanceProvider={formData.maintenance_provider}
              handleCheckboxChange={handleCheckboxChange}
              handleChange={handleChange}
            />

            <FormActions loading={loading} onCancel={handleCancel} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
