
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  notes?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function NotesSection({
  notes,
  handleChange,
}: NotesSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Notizen</Label>
      <Textarea
        id="notes"
        name="notes"
        rows={3}
        value={notes || ""}
        onChange={handleChange}
      />
    </div>
  );
}
