
export type ProjectStatus = 'Geplant' | 'In Umsetzung' | 'Abgeschlossen' | 'Pausiert';

export type ChecklistCategory = 
  | 'Projektstart' 
  | 'Planung' 
  | 'Technik' 
  | 'Subunternehmer' 
  | 'Ausführung' 
  | 'Abnahme' 
  | 'Abrechnung' 
  | 'Betrieb';

export type ChecklistStatus = 'Offen' | 'In Bearbeitung' | 'Erledigt' | 'Blockiert';

export type UserRole = 'Projektleiter' | 'Subunternehmer' | 'Technischer Planer' | 'Kunde';

export interface User {
  id: string;
  name: string;
  roles: UserRole[];
  projectIds: string[];
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  manager: string;
  location: string;
  client: string;
  notes: string;
  progress: number;
}

export interface ChecklistItem {
  id: string;
  projectId: string;
  category: ChecklistCategory;
  description: string;
  isRequired: boolean;
  status: ChecklistStatus;
  responsible: string;
  plannedDate: string | null; // ISO date string
  completedDate: string | null; // ISO date string
  documents: string[]; // Array of file URLs
  notes: string;
}

export interface ProjectRole {
  id: string;
  projectId: string;
  userId: string;
  role: UserRole;
}
