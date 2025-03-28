
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { electricityTariffs } from "@/constants/systemDesignFields";

interface ElectricitySectionProps {
  electricityTariff?: string;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function ElectricitySection({
  electricityTariff,
  handleSelectChange,
}: ElectricitySectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="electricity_tariff">Stromtarifmodell</Label>
      <Select
        value={electricityTariff}
        onValueChange={(value) => handleSelectChange("electricity_tariff", value)}
      >
        <SelectTrigger id="electricity_tariff">
          <SelectValue placeholder="Stromtarifmodell auswählen" />
        </SelectTrigger>
        <SelectContent>
          {electricityTariffs.map((tariff) => (
            <SelectItem key={tariff} value={tariff}>
              {tariff}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
