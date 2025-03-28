
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RegulationSectionProps {
  regulationPerformed: boolean;
  customerInstructionDone: boolean;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

export default function RegulationSection({
  regulationPerformed,
  customerInstructionDone,
  handleCheckboxChange,
}: RegulationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Regelung & Einweisung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="regulation_performed"
            checked={regulationPerformed}
            onCheckedChange={(checked) =>
              handleCheckboxChange("regulation_performed", checked === true)
            }
          />
          <Label htmlFor="regulation_performed">Regelung durchgeführt</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="customer_instruction_done"
            checked={customerInstructionDone}
            onCheckedChange={(checked) =>
              handleCheckboxChange("customer_instruction_done", checked === true)
            }
          />
          <Label htmlFor="customer_instruction_done">Kundeneinweisung erfolgt</Label>
        </div>
      </CardContent>
    </Card>
  );
}
