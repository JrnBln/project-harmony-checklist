
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/supabase";

interface ProjectRolesBadgeProps {
  role: UserRole;
}

export default function ProjectRolesBadge({ role }: ProjectRolesBadgeProps) {
  // Define color mappings for different roles
  const roleColorMap: Record<UserRole, string> = {
    'Projektleiter': 'bg-blue-500 hover:bg-blue-600',
    'Techniker': 'bg-green-500 hover:bg-green-600',
    'Bauleitung': 'bg-orange-500 hover:bg-orange-600',
    'Betreiber': 'bg-purple-500 hover:bg-purple-600',
    'Kunde': 'bg-gray-500 hover:bg-gray-600'
  };

  return (
    <Badge className={roleColorMap[role]}>
      {role}
    </Badge>
  );
}
