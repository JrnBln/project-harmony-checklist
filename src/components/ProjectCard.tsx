
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types/models';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserIcon 
} from 'lucide-react';
import ProgressRing from './ProgressRing';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Geplant':
        return 'bg-blue-100 text-blue-800';
      case 'In Umsetzung':
        return 'bg-amber-100 text-amber-800';
      case 'Abgeschlossen':
        return 'bg-green-100 text-green-800';
      case 'Pausiert':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-heatpump-700 mb-1">{project.name}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {project.client}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(project.status)} ml-2`}>{project.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{project.manager}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>
              {new Date(project.startDate).toLocaleDateString('de-DE')} - {new Date(project.endDate).toLocaleDateString('de-DE')}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <ProgressRing progress={project.progress} size={60} />
        <Link 
          to={`/projects/${project.id}`}
          className="px-4 py-2 bg-heatpump-600 text-white rounded-md hover:bg-heatpump-700 transition-colors"
        >
          Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
