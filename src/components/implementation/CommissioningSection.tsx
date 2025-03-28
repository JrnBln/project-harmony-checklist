
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CommissioningSectionProps {
  regulationPerformed: boolean;
  customerInstructionDone: boolean;
  monitoringActivated: boolean;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

export default function CommissioningSection({
  regulationPerformed,
  customerInstructionDone,
  monitoringActivated,
  handleCheckboxChange,
}: CommissioningSectionProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="regulation_performed"
            checked={regulationPerformed}
            onCheckedChange={(checked) =>
              handleCheckboxChange("regulation_performed", checked === true)
            }
          />
          <Label htmlFor="regulation_performed">Einregulierung durchgeführt</Label>
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
      </div>

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
    </>
  );
}
