
import { Progress } from "@/components/ui/progress";

interface FormProgressBarProps {
  progress: number;
  label?: string;
}

export default function FormProgressBar({ progress, label }: FormProgressBarProps) {
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Formular-Fortschritt</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      {label && (
        <p className="text-xs text-muted-foreground text-center mt-1">{label}</p>
      )}
    </div>
  );
}
