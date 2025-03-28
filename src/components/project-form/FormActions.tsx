
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

export default function FormActions({
  loading,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-2 mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        Abbrechen
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? "Speichern..." : "Speichern"}
      </Button>
    </div>
  );
}
