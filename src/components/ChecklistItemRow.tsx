
import React from 'react';
import { ChecklistItem } from '@/types/models';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface ChecklistItemRowProps {
  item: ChecklistItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ChecklistItemRow: React.FC<ChecklistItemRowProps> = ({ 
  item, 
  isExpanded,
  onToggleExpand
}) => {
  const { updateChecklistItem } = useAppContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Offen':
        return 'bg-gray-100 text-gray-800';
      case 'In Bearbeitung':
        return 'bg-amber-100 text-amber-800';
      case 'Erledigt':
        return 'bg-green-100 text-green-800';
      case 'Blockiert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Projektstart':
        return 'bg-blue-100 text-blue-800';
      case 'Planung':
        return 'bg-cyan-100 text-cyan-800';
      case 'Technik':
        return 'bg-indigo-100 text-indigo-800';
      case 'Subunternehmer':
        return 'bg-orange-100 text-orange-800';
      case 'Ausführung':
        return 'bg-purple-100 text-purple-800';
      case 'Abnahme':
        return 'bg-teal-100 text-teal-800';
      case 'Abrechnung':
        return 'bg-yellow-100 text-yellow-800';
      case 'Betrieb':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (newStatus: "Erledigt" | "Offen") => {
    updateChecklistItem(item.id, { 
      status: newStatus,
      completedDate: newStatus === 'Erledigt' ? new Date().toISOString() : null 
    });
  };

  return (
    <div className="border rounded-md mb-2 overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-grow">
            <div className="pt-0.5">
              <Checkbox 
                checked={item.status === "Erledigt"}
                onCheckedChange={(checked) => {
                  handleStatusChange(checked ? "Erledigt" : "Offen");
                }}
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-1">
                <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                {item.isRequired && (
                  <Badge variant="outline" className="border-red-300 text-red-700">Pflicht</Badge>
                )}
              </div>
              <h3 className={`font-medium ${item.status === 'Erledigt' ? 'line-through text-muted-foreground' : ''}`}>
                {item.description}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Verantwortlich: {item.responsible}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-2">
            {item.documents.length > 0 && (
              <div className="bg-muted flex items-center justify-center h-8 w-8 rounded-full">
                <FileIcon className="h-4 w-4" />
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-8 w-8" 
              onClick={onToggleExpand}
            >
              {isExpanded ? 
                <ChevronUpIcon className="h-5 w-5" /> : 
                <ChevronDownIcon className="h-5 w-5" />
              }
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-medium mb-1">Geplantes Datum</p>
              <p className="text-sm">
                {item.plannedDate ? new Date(item.plannedDate).toLocaleDateString('de-DE') : 'Nicht festgelegt'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Erledigt am</p>
              <p className="text-sm">
                {item.completedDate ? new Date(item.completedDate).toLocaleDateString('de-DE') : '-'}
              </p>
            </div>
          </div>
          
          {item.notes && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Bemerkungen</p>
              <div className="bg-muted p-2 rounded text-sm">
                {item.notes}
              </div>
            </div>
          )}
          
          {item.documents.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Dokumente</p>
              <div className="flex flex-wrap gap-2">
                {item.documents.map((doc, index) => (
                  <div key={index} className="flex items-center bg-muted px-3 py-1 rounded text-sm">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChecklistItemRow;
