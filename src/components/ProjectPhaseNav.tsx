
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectPhaseNavProps {
  projectId: string;
  activePhase: string;
}

export default function ProjectPhaseNav({ projectId, activePhase }: ProjectPhaseNavProps) {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    switch (value) {
      case "overview":
        navigate(`/projects/${projectId}`);
        break;
      case "technical":
        navigate(`/projects/${projectId}/technical-data`);
        break;
      case "design":
        navigate(`/projects/${projectId}/system-design`);
        break;
      case "implementation":
        navigate(`/projects/${projectId}/implementation`);
        break;
      case "operation":
        navigate(`/projects/${projectId}/operation`);
        break;
      case "checklist":
        navigate(`/projects/${projectId}/checklist`);
        break;
    }
  };

  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-2"
        onClick={() => navigate("/projects")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Zurück zur Projektübersicht
      </Button>
      
      <Tabs 
        defaultValue={activePhase} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full overflow-x-auto flex-wrap justify-start md:justify-center">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="technical">Technik</TabsTrigger>
          <TabsTrigger value="design">Auslegung</TabsTrigger>
          <TabsTrigger value="implementation">Umsetzung</TabsTrigger>
          <TabsTrigger value="operation">Betrieb</TabsTrigger>
          <TabsTrigger value="checklist">Checkliste</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
