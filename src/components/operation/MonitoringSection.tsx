
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface MonitoringSectionProps {
  monitoringActive: boolean;
  monitoringSystem: string | undefined;
  remoteAccessConfigured: boolean;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MonitoringSection({
  monitoringActive,
  monitoringSystem,
  remoteAccessConfigured,
  handleCheckboxChange,
  handleChange
}: MonitoringSectionProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Monitoring & Fernzugriff</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="monitoring_active"
            checked={monitoringActive}
            onCheckedChange={(checked) => 
              handleCheckboxChange('monitoring_active', checked as boolean)
            }
          />
          <Label htmlFor="monitoring_active">Monitoring ist aktiv</Label>
        </div>

        {monitoringActive && (
          <div>
            <Label htmlFor="monitoring_system">Monitoring-System</Label>
            <Input
              id="monitoring_system"
              name="monitoring_system"
              placeholder="z.B. Hersteller-Portal, SG Ready, etc."
              value={monitoringSystem || ''}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote_access_configured"
            checked={remoteAccessConfigured}
            onCheckedChange={(checked) => 
              handleCheckboxChange('remote_access_configured', checked as boolean)
            }
          />
          <Label htmlFor="remote_access_configured">Fernzugriff ist eingerichtet</Label>
        </div>
      </CardContent>
    </Card>
  );
}
