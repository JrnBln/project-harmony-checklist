
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonitoringSectionProps {
  monitoringActivated: boolean;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

export default function MonitoringSection({
  monitoringActivated,
  handleCheckboxChange,
}: MonitoringSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="monitoring_activated"
            checked={monitoringActivated}
            onCheckedChange={(checked) =>
              handleCheckboxChange("monitoring_activated", checked === true)
            }
          />
          <Label htmlFor="monitoring_activated">Monitoring aktiviert</Label>
        </div>
      </CardContent>
    </Card>
  );
}
