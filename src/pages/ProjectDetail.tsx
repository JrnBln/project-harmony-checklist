
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { ChecklistCategory, ChecklistStatus } from '@/types/models';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  ClipboardListIcon,
  EditIcon
} from 'lucide-react';
import ChecklistItemRow from '@/components/ChecklistItemRow';
import ProgressRing from '@/components/ProgressRing';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, checklistItems } = useAppContext();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<ChecklistCategory | 'Alle'>('Alle');
  const [statusFilter, setStatusFilter] = useState<ChecklistStatus | 'Alle'>('Alle');
  
  // Find the project
  const project = projects.find(p => p.id === projectId);
  
  // Get project checklist items
  const projectChecklistItems = checklistItems.filter(item => item.projectId === projectId);
  
  // Apply filters
  const filteredItems = projectChecklistItems.filter(item => {
    const matchesCategory = categoryFilter === 'Alle' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'Alle' || item.status === statusFilter;
    return matchesCategory && matchesStatus;
  });
  
  // Categorize items
  const itemsByCategory: Record<ChecklistCategory, typeof filteredItems> = {
    'Projektstart': [],
    'Planung': [],
    'Technik': [],
    'Subunternehmer': [],
    'Ausführung': [],
    'Abnahme': [],
    'Abrechnung': [],
    'Betrieb': []
  };
  
  filteredItems.forEach(item => {
    itemsByCategory[item.category].push(item);
  });
  
  const toggleItemExpanded = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };
  
  // If project not found
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Projekt nicht gefunden</h1>
        <p className="mb-4">Das gesuchte Projekt konnte nicht gefunden werden.</p>
        <Link to="/">
          <Button>Zurück zur Übersicht</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground mb-4 sm:mb-0">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Zurück zur Übersicht
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/projects/${projectId}/edit`)}>
            <EditIcon className="h-4 w-4 mr-2" />
            Bearbeiten
          </Button>
          <Button onClick={() => navigate(`/projects/${projectId}/checklist/new`)}>
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Checklistenpunkt hinzufügen
          </Button>
        </div>
      </div>
      
      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-grow">
            <div className="flex items-start space-x-3">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <Badge className={`mt-1 ${
                project.status === 'Geplant' ? 'bg-blue-100 text-blue-800' :
                project.status === 'In Umsetzung' ? 'bg-amber-100 text-amber-800' :
                project.status === 'Abgeschlossen' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </Badge>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <UserIcon className="h-4 w-4 mr-2" />
                <span>Projektleiter: {project.manager}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>
                  {new Date(project.startDate).toLocaleDateString('de-DE')} - {new Date(project.endDate).toLocaleDateString('de-DE')}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <ClipboardListIcon className="h-4 w-4 mr-2" />
                <span>Kunde: {project.client}</span>
              </div>
            </div>
            
            {project.notes && (
              <div className="mt-4">
                <h3 className="font-medium mb-1">Notizen:</h3>
                <p className="text-muted-foreground">{project.notes}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col items-center">
            <ProgressRing progress={project.progress} size={100} strokeWidth={8} />
            <span className="mt-2 text-sm text-muted-foreground">Projektfortschritt</span>
          </div>
        </div>
      </div>
      
      {/* Checklist Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Projektcheckliste</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Kategorie</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm"
                variant={categoryFilter === 'Alle' ? 'default' : 'outline'}
                onClick={() => setCategoryFilter('Alle')}
              >
                Alle
              </Button>
              {Object.keys(itemsByCategory).map(category => (
                <Button 
                  key={category}
                  size="sm"
                  variant={categoryFilter === category ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter(category as ChecklistCategory)}
                  className={
                    categoryFilter === category ? 'bg-heatpump-600 hover:bg-heatpump-700' : ''
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="md:ml-auto">
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm"
                variant={statusFilter === 'Alle' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('Alle')}
              >
                Alle
              </Button>
              <Button 
                size="sm"
                variant={statusFilter === 'Offen' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('Offen')}
                className={statusFilter === 'Offen' ? 'bg-gray-600 hover:bg-gray-700' : ''}
              >
                Offen
              </Button>
              <Button 
                size="sm"
                variant={statusFilter === 'In Bearbeitung' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('In Bearbeitung')}
                className={statusFilter === 'In Bearbeitung' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                In Bearbeitung
              </Button>
              <Button 
                size="sm"
                variant={statusFilter === 'Erledigt' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('Erledigt')}
                className={statusFilter === 'Erledigt' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Erledigt
              </Button>
              <Button 
                size="sm"
                variant={statusFilter === 'Blockiert' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('Blockiert')}
                className={statusFilter === 'Blockiert' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                Blockiert
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checklist Items */}
      {filteredItems.length > 0 ? (
        <div className="space-y-6">
          {categoryFilter === 'Alle' ? (
            Object.entries(itemsByCategory).map(([category, items]) => 
              items.length > 0 && (
                <div key={category}>
                  <h3 className="font-medium text-lg mb-3">{category}</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <ChecklistItemRow
                        key={item.id}
                        item={item}
                        isExpanded={expandedItems.has(item.id)}
                        onToggleExpand={() => toggleItemExpanded(item.id)}
                      />
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            <div className="space-y-2">
              {filteredItems.map(item => (
                <ChecklistItemRow
                  key={item.id}
                  item={item}
                  isExpanded={expandedItems.has(item.id)}
                  onToggleExpand={() => toggleItemExpanded(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-muted-foreground">Keine Checklistenpunkte gefunden.</p>
          <Button 
            className="mt-4 bg-heatpump-600 hover:bg-heatpump-700"
            onClick={() => navigate(`/projects/${projectId}/checklist/new`)}
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Checklistenpunkt hinzufügen
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
