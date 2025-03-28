
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export default function FormProgressBar({ progress, label, className }: FormProgressBarProps) {
  return (
    <div className={cn("w-full space-y-1", className)}>
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
