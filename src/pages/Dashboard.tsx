
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { ProjectStatus, ChecklistStatus } from '@/types/models';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  ArrowRightIcon,
} from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';

const Dashboard: React.FC = () => {
  const { projects, checklistItems } = useAppContext();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'Alle'>('Alle');

  const filteredProjects = statusFilter === 'Alle'
    ? projects
    : projects.filter(project => project.status === statusFilter);

  // Get stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'In Umsetzung').length;
  const completedProjects = projects.filter(p => p.status === 'Abgeschlossen').length;
  
  const overdueTasks = checklistItems.filter(item => {
    if (item.status !== 'Erledigt' && item.plannedDate) {
      const plannedDate = new Date(item.plannedDate);
      return plannedDate < new Date();
    }
    return false;
  }).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Übersicht aller Wärmepumpenprojekte</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/projects/new">
            <Button className="bg-heatpump-600 hover:bg-heatpump-700">
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Neues Projekt
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Projekte gesamt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold">{totalProjects}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Aktive Projekte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-amber-600">{activeProjects}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Abgeschlossen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-green-600">{completedProjects}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Überfällige Aufgaben</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-red-600">{overdueTasks}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={statusFilter === 'Alle' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('Alle')}
            className={statusFilter === 'Alle' ? 'bg-heatpump-600 hover:bg-heatpump-700' : ''}
          >
            Alle
          </Button>
          <Button 
            variant={statusFilter === 'Geplant' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('Geplant')}
            className={statusFilter === 'Geplant' ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            <ClockIcon className="h-4 w-4 mr-2" />
            Geplant
          </Button>
          <Button 
            variant={statusFilter === 'In Umsetzung' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('In Umsetzung')}
            className={statusFilter === 'In Umsetzung' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            <ArrowRightIcon className="h-4 w-4 mr-2" />
            In Umsetzung
          </Button>
          <Button 
            variant={statusFilter === 'Abgeschlossen' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('Abgeschlossen')}
            className={statusFilter === 'Abgeschlossen' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            <CheckCircleIcon className="h-4 w-4 mr-2" />
            Abgeschlossen
          </Button>
          <Button 
            variant={statusFilter === 'Pausiert' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('Pausiert')}
            className={statusFilter === 'Pausiert' ? 'bg-gray-600 hover:bg-gray-700' : ''}
          >
            <AlertCircleIcon className="h-4 w-4 mr-2" />
            Pausiert
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Keine Projekte mit dem ausgewählten Status gefunden.</p>
          <Link to="/projects/new">
            <Button className="mt-4 bg-heatpump-600 hover:bg-heatpump-700">
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Neues Projekt erstellen
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
