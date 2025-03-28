
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectStatusSectionProps {
  formData: {
    status?: string;
    startdate?: string;
    enddate?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function ProjectStatusSection({
  formData,
  handleChange,
  handleSelectChange,
}: ProjectStatusSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Projektstatus</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status wählen" />
            </SelectTrigger>
            <SelectContent>
              {["Geplant", "In Umsetzung", "Abgeschlossen", "Pausiert"].map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startdate">Startdatum</Label>
          <Input
            id="startdate"
            name="startdate"
            type="date"
            value={formData.startdate || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="enddate">Enddatum</Label>
          <Input
            id="enddate"
            name="enddate"
            type="date"
            value={formData.enddate || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
