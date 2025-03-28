
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface MaintenanceSectionProps {
  maintenanceScheduleSet: boolean;
  nextMaintenanceDate: string | undefined;
  maintenanceProvider: string | undefined;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MaintenanceSection({
  maintenanceScheduleSet,
  nextMaintenanceDate,
  maintenanceProvider,
  handleCheckboxChange,
  handleChange
}: MaintenanceSectionProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Wartung & Service</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintenance_schedule_set"
            checked={maintenanceScheduleSet}
            onCheckedChange={(checked) => 
              handleCheckboxChange('maintenance_schedule_set', checked as boolean)
            }
          />
          <Label htmlFor="maintenance_schedule_set">Wartungsplan ist eingerichtet</Label>
        </div>

        {maintenanceScheduleSet && (
          <>
            <div>
              <Label htmlFor="next_maintenance_date">Nächster Wartungstermin</Label>
              <Input
                id="next_maintenance_date"
                name="next_maintenance_date"
                type="date"
                value={nextMaintenanceDate || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="maintenance_provider">Wartungsdienstleister</Label>
              <Input
                id="maintenance_provider"
                name="maintenance_provider"
                placeholder="Name des Wartungsunternehmens"
                value={maintenanceProvider || ''}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
