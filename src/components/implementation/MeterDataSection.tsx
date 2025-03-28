
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MeterDataSectionProps {
  heatMeterData?: number;
  electricityMeterData?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MeterDataSection({
  heatMeterData,
  electricityMeterData,
  handleChange,
}: MeterDataSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="heat_meter_data">Zählerdaten Wärme</Label>
        <Input
          id="heat_meter_data"
          name="heat_meter_data"
          type="number"
          step="0.01"
          min="0"
          value={heatMeterData || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="electricity_meter_data">Zählerdaten Strom</Label>
        <Input
          id="electricity_meter_data"
          name="electricity_meter_data"
          type="number"
          step="0.01"
          min="0"
          value={electricityMeterData || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
