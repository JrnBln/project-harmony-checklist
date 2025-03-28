
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ClientInfoSectionProps {
  formData: {
    client?: string;
    manager?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ClientInfoSection({
  formData,
  handleChange,
}: ClientInfoSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="client">Kunde</Label>
        <Input
          id="client"
          name="client"
          value={formData.client || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manager">Projektleiter</Label>
        <Input
          id="manager"
          name="manager"
          value={formData.manager || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
