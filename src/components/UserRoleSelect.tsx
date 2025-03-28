
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/supabase";

interface UserRoleSelectProps {
  role: UserRole | undefined;
  disabled: boolean;
  handleRoleChange: (value: UserRole) => void;
}

export default function UserRoleSelect({
  role,
  disabled,
  handleRoleChange,
}: UserRoleSelectProps) {
  const roles: UserRole[] = ['Projektleiter', 'Techniker', 'Bauleitung', 'Betreiber', 'Kunde'];

  return (
    <div className="space-y-2">
      <Label htmlFor="role">Rolle</Label>
      <Select
        value={role}
        onValueChange={(value) => handleRoleChange(value as UserRole)}
        disabled={disabled}
      >
        <SelectTrigger id="role">
          <SelectValue placeholder="Rolle auswählen" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((roleOption) => (
            <SelectItem key={roleOption} value={roleOption}>
              {roleOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
