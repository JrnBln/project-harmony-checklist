
import { Progress } from "@/components/ui/progress";

interface FormProgressBarProps {
  progress: number;
  className?: string;
}

export default function FormProgressBar({ progress, className = "" }: FormProgressBarProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Formular-Fortschritt</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
