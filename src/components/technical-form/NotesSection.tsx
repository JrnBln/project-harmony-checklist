
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function NotesSection({
  notes,
  handleChange,
}: NotesSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Notizen und Anmerkungen</Label>
      <Textarea
        id="notes"
        name="notes"
        value={notes || ""}
        onChange={handleChange}
        placeholder="Notizen zum Projekt eingeben..."
        className="min-h-[100px]"
      />
    </div>
  );
}
