
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConstructionSectionProps {
  constructionProgressDocumented: boolean;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

export default function ConstructionSection({
  constructionProgressDocumented,
  handleCheckboxChange,
}: ConstructionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Baufortschritt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="construction_progress_documented"
            checked={constructionProgressDocumented}
            onCheckedChange={(checked) =>
              handleCheckboxChange("construction_progress_documented", checked === true)
            }
          />
          <Label htmlFor="construction_progress_documented">Baufortschritt dokumentiert</Label>
        </div>
      </CardContent>
    </Card>
  );
}
