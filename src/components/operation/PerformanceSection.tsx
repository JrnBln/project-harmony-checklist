
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceSectionProps {
  measuredSpf: string | number | undefined;
  measuredCop: string | number | undefined;
  performanceAsExpected: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export default function PerformanceSection({
  measuredSpf,
  measuredCop,
  performanceAsExpected,
  handleChange,
  handleSelectChange
}: PerformanceSectionProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Leistungsdaten</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="measured_spf">Gemessene Jahresarbeitszahl (JAZ)</Label>
            <Input
              id="measured_spf"
              name="measured_spf"
              type="number"
              step="0.1"
              placeholder="z.B. 3.5"
              value={measuredSpf || ''}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Gemessene Jahresarbeitszahl nach einem Jahr Betrieb
            </p>
          </div>
          <div>
            <Label htmlFor="measured_cop">Gemessener COP</Label>
            <Input
              id="measured_cop"
              name="measured_cop"
              type="number"
              step="0.1"
              placeholder="z.B. 4.2"
              value={measuredCop || ''}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Gemessener Leistungswert im Betrieb
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="performance_as_expected">Entspricht die Leistung den Erwartungen?</Label>
          <Select
            value={performanceAsExpected || ''}
            onValueChange={(value) => handleSelectChange('performance_as_expected', value)}
          >
            <SelectTrigger id="performance_as_expected">
              <SelectValue placeholder="Bitte auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ja">Ja, wie erwartet oder besser</SelectItem>
              <SelectItem value="Teilweise">Teilweise, leicht unter Erwartung</SelectItem>
              <SelectItem value="Nein">Nein, deutlich unter Erwartung</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
