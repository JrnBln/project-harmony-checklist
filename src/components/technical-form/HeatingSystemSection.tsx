
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface HeatingSystemSectionProps {
  bufferTankAvailable: boolean;
  hotWaterIntegrated: boolean;
  gridConnectionCapacity?: number;
  threePhasedConnection: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

export default function HeatingSystemSection({
  bufferTankAvailable,
  hotWaterIntegrated,
  gridConnectionCapacity,
  threePhasedConnection,
  handleChange,
  handleCheckboxChange,
}: HeatingSystemSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Heizungssystem</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="buffer_tank_available"
            checked={bufferTankAvailable}
            onCheckedChange={(checked) =>
              handleCheckboxChange("buffer_tank_available", checked === true)
            }
          />
          <Label htmlFor="buffer_tank_available">Pufferspeicher vorhanden</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hot_water_integrated"
            checked={hotWaterIntegrated}
            onCheckedChange={(checked) =>
              handleCheckboxChange("hot_water_integrated", checked === true)
            }
          />
          <Label htmlFor="hot_water_integrated">Warmwasserbereitung integriert</Label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grid_connection_capacity">Netzanschlussleistung (kW)</Label>
          <Input
            id="grid_connection_capacity"
            name="grid_connection_capacity"
            type="number"
            step="0.1"
            min="0"
            value={gridConnectionCapacity || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="three_phase_connection"
            checked={threePhasedConnection}
            onCheckedChange={(checked) =>
              handleCheckboxChange("three_phase_connection", checked === true)
            }
          />
          <Label htmlFor="three_phase_connection">3-phasiger Hausanschluss</Label>
        </div>
      </div>
    </div>
  );
}
