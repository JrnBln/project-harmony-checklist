
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectExtended } from "@/types/supabase";

interface ProjectSelectSectionProps {
  projectId: string;
  projects: ProjectExtended[];
  disabled: boolean;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function ProjectSelectSection({
  projectId,
  projects,
  disabled,
  handleSelectChange,
}: ProjectSelectSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="project_id">Projekt</Label>
      <Select
        value={projectId}
        onValueChange={(value) => handleSelectChange("project_id", value)}
        disabled={disabled}
      >
        <SelectTrigger id="project_id">
          <SelectValue placeholder="Projekt auswählen" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
