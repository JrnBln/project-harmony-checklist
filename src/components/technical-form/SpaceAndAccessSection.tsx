
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DrillAccess } from "@/types/supabase";

interface SpaceAndAccessSectionProps {
  indoorUnitSpaceAvailable: boolean;
  outdoorUnitSpaceAvailable: boolean;
  drillAccess?: DrillAccess;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function SpaceAndAccessSection({
  indoorUnitSpaceAvailable,
  outdoorUnitSpaceAvailable,
  drillAccess,
  handleCheckboxChange,
  handleSelectChange,
}: SpaceAndAccessSectionProps) {
  const drillAccessOptions: DrillAccess[] = ["möglich", "eingeschränkt", "nicht möglich"];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Platzverhältnisse & Zugang</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="indoor_unit_space_available"
            checked={indoorUnitSpaceAvailable}
            onCheckedChange={(checked) =>
              handleCheckboxChange("indoor_unit_space_available", checked === true)
            }
          />
          <Label htmlFor="indoor_unit_space_available">Platz für Inneneinheit vorhanden</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="outdoor_unit_space_available"
            checked={outdoorUnitSpaceAvailable}
            onCheckedChange={(checked) =>
              handleCheckboxChange("outdoor_unit_space_available", checked === true)
            }
          />
          <Label htmlFor="outdoor_unit_space_available">Platz für Außeneinheit vorhanden</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="drill_access">Zugang für Bohrgerät</Label>
        <Select
          value={drillAccess}
          onValueChange={(value) => handleSelectChange("drill_access", value)}
        >
          <SelectTrigger id="drill_access">
            <SelectValue placeholder="Zugangsmöglichkeit auswählen" />
          </SelectTrigger>
          <SelectContent>
            {drillAccessOptions.map((access) => (
              <SelectItem key={access} value={access}>
                {access}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
