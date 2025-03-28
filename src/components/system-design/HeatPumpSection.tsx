
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { heatPumpTypes, heatSources } from "@/constants/systemDesignFields";

interface HeatPumpSectionProps {
  heatPumpType?: string;
  heatingCapacityPlanned?: number;
  cop?: number;
  estimatedSpf?: number;
  heatSource?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function HeatPumpSection({
  heatPumpType,
  heatingCapacityPlanned,
  cop,
  estimatedSpf,
  heatSource,
  handleChange,
  handleSelectChange,
}: HeatPumpSectionProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heat_pump_type">Wärmepumpentyp</Label>
          <Select
            value={heatPumpType}
            onValueChange={(value) => handleSelectChange("heat_pump_type", value)}
          >
            <SelectTrigger id="heat_pump_type">
              <SelectValue placeholder="Wärmepumpentyp auswählen" />
            </SelectTrigger>
            <SelectContent>
              {heatPumpTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="heat_source">Wärmequelle</Label>
          <Select
            value={heatSource}
            onValueChange={(value) => handleSelectChange("heat_source", value)}
          >
            <SelectTrigger id="heat_source">
              <SelectValue placeholder="Wärmequelle auswählen" />
            </SelectTrigger>
            <SelectContent>
              {heatSources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heating_capacity_planned">Heizleistung geplant (kW)</Label>
          <Input
            id="heating_capacity_planned"
            name="heating_capacity_planned"
            type="number"
            step="0.1"
            min="0"
            value={heatingCapacityPlanned || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cop">COP</Label>
          <Input
            id="cop"
            name="cop"
            type="number"
            step="0.1"
            min="0"
            value={cop || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_spf">JAZ geschätzt</Label>
          <Input
            id="estimated_spf"
            name="estimated_spf"
            type="number"
            step="0.1"
            min="0"
            value={estimatedSpf || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
