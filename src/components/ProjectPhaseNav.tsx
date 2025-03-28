
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clipboard, Wrench, Calculator, HardHat, Activity, CheckSquare } from "lucide-react";

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
        // Da wir aktuell keine dedizierte Checklisten-Seite haben, 
        // leiten wir auf die Übersicht weiter, die bereits die Checkliste enthält
        navigate(`/projects/${projectId}`);
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
        value={activePhase} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full overflow-x-auto flex-wrap justify-start md:justify-center">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Clipboard className="h-4 w-4" />
            <span className="hidden sm:inline">Übersicht</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-1">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Technik</span>
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Auslegung</span>
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-1">
            <HardHat className="h-4 w-4" />
            <span className="hidden sm:inline">Umsetzung</span>
          </TabsTrigger>
          <TabsTrigger value="operation" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Betrieb</span>
          </TabsTrigger>
          <TabsTrigger value="checklist" className="flex items-center gap-1">
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Checkliste</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        VDI 4645 Projektphasen
      </div>
    </div>
  );
}
