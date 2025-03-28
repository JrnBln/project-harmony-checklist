
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeatingSurface } from "@/types/supabase";

interface BuildingDataSectionProps {
  heatingLoadCalculated?: number;
  heatDemandEstimated?: number;
  numberOfUnits?: number;
  heatingSurfaces?: HeatingSurface;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function BuildingDataSection({
  heatingLoadCalculated,
  heatDemandEstimated,
  numberOfUnits,
  heatingSurfaces,
  handleChange,
  handleSelectChange,
}: BuildingDataSectionProps) {
  const heatingSurfaceOptions: HeatingSurface[] = ["Radiatoren", "FBH", "Wandheizung", "Gemischt"];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Gebäudedaten</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heating_load_calculated">Heizlast berechnet (kW)</Label>
          <Input
            id="heating_load_calculated"
            name="heating_load_calculated"
            type="number"
            step="0.1"
            min="0"
            value={heatingLoadCalculated || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heat_demand_estimated">Wärmebedarf geschätzt (kWh/a)</Label>
          <Input
            id="heat_demand_estimated"
            name="heat_demand_estimated"
            type="number"
            step="100"
            min="0"
            value={heatDemandEstimated || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number_of_units">Anzahl Wohneinheiten</Label>
          <Input
            id="number_of_units"
            name="number_of_units"
            type="number"
            min="1"
            value={numberOfUnits || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heating_surfaces">Heizflächen vorhanden</Label>
          <Select
            value={heatingSurfaces}
            onValueChange={(value) => handleSelectChange("heating_surfaces", value)}
          >
            <SelectTrigger id="heating_surfaces">
              <SelectValue placeholder="Heizflächen auswählen" />
            </SelectTrigger>
            <SelectContent>
              {heatingSurfaceOptions.map((surface) => (
                <SelectItem key={surface} value={surface}>
                  {surface}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
