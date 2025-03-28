
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuildingType, RenovationStatus, EnergySource } from "@/types/supabase";

const buildingTypes: BuildingType[] = ["EFH", "MFH", "Gewerbe", "Industrie"];
const renovationStatuses: RenovationStatus[] = ["unsaniert", "teilsaniert", "vollsaniert"];
const energySources: EnergySource[] = ["Gas", "Öl", "Fernwärme", "Strom", "Sonstiges"];

interface GeneralProjectDataSectionProps {
  formData: {
    name?: string;
    location?: string;
    building_type?: BuildingType;
    construction_year?: number;
    renovation_status?: RenovationStatus;
    previous_energy_source?: EnergySource;
    project_goal?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function GeneralProjectDataSection({
  formData,
  handleChange,
  handleSelectChange,
}: GeneralProjectDataSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Allgemeine Projektdaten</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Projektname</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Standort</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="building_type">Gebäudetyp</Label>
          <Select
            value={formData.building_type}
            onValueChange={(value) => handleSelectChange("building_type", value)}
          >
            <SelectTrigger id="building_type">
              <SelectValue placeholder="Gebäudetyp wählen" />
            </SelectTrigger>
            <SelectContent>
              {buildingTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="construction_year">Baujahr</Label>
          <Input
            id="construction_year"
            name="construction_year"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.construction_year || ""}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="renovation_status">Sanierungsstand</Label>
          <Select
            value={formData.renovation_status}
            onValueChange={(value) => handleSelectChange("renovation_status", value)}
          >
            <SelectTrigger id="renovation_status">
              <SelectValue placeholder="Sanierungsstand wählen" />
            </SelectTrigger>
            <SelectContent>
              {renovationStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="previous_energy_source">Energieträger bisher</Label>
          <Select
            value={formData.previous_energy_source}
            onValueChange={(value) => handleSelectChange("previous_energy_source", value)}
          >
            <SelectTrigger id="previous_energy_source">
              <SelectValue placeholder="Energieträger wählen" />
            </SelectTrigger>
            <SelectContent>
              {energySources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="project_goal">Projektziel</Label>
          <Input
            id="project_goal"
            name="project_goal"
            value={formData.project_goal || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
