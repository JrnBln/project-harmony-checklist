
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { permissionStatuses } from "@/constants/systemDesignFields";

interface RequirementsSectionProps {
  spaceRequirementsMet: boolean;
  soundRequirementsMet: boolean;
  permissionsRequired?: string;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string | undefined) => void;
}

export default function RequirementsSection({
  spaceRequirementsMet,
  soundRequirementsMet,
  permissionsRequired,
  handleCheckboxChange,
  handleSelectChange,
}: RequirementsSectionProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="space_requirements_met"
            checked={spaceRequirementsMet}
            onCheckedChange={(checked) =>
              handleCheckboxChange("space_requirements_met", checked === true)
            }
          />
          <Label htmlFor="space_requirements_met">Platzbedarf erfüllt</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sound_requirements_met"
            checked={soundRequirementsMet}
            onCheckedChange={(checked) =>
              handleCheckboxChange("sound_requirements_met", checked === true)
            }
          />
          <Label htmlFor="sound_requirements_met">Schallanforderungen erfüllt</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="permissions_required">Genehmigungen erforderlich</Label>
        <Select
          value={permissionsRequired}
          onValueChange={(value) => handleSelectChange("permissions_required", value)}
        >
          <SelectTrigger id="permissions_required">
            <SelectValue placeholder="Auswählen" />
          </SelectTrigger>
          <SelectContent>
            {permissionStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
