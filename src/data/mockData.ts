
import { Project, ChecklistItem, User, ProjectRole, ProjectStatus, ChecklistCategory, ChecklistStatus, UserRole } from '@/types/models';

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Max Mustermann",
    roles: ["Projektleiter"],
    projectIds: ["project-1", "project-2"]
  },
  {
    id: "user-2",
    name: "Anna Schmidt",
    roles: ["Technischer Planer"],
    projectIds: ["project-1"]
  },
  {
    id: "user-3",
    name: "Peter Meyer",
    roles: ["Subunternehmer"],
    projectIds: ["project-1", "project-3"]
  },
  {
    id: "user-4",
    name: "Sabine Weber",
    roles: ["Kunde"],
    projectIds: ["project-2"]
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Wärmepumpenanlage Gewerbepark Nord",
    status: "In Umsetzung",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    manager: "Max Mustermann",
    location: "Gewerbepark Nord, Berlin",
    client: "Gewerbepark Nord GmbH",
    notes: "Großprojekt mit 5 Wärmepumpen für Bürogebäude",
    progress: 35
  },
  {
    id: "project-2",
    name: "Wärmepumpe Hotel Seeblick",
    status: "Geplant",
    startDate: "2023-11-15",
    endDate: "2024-02-28",
    manager: "Max Mustermann",
    location: "Seestraße 123, München",
    client: "Hotel Seeblick GmbH",
    notes: "Ersatz der alten Ölheizung durch Luft-Wasser-Wärmepumpe",
    progress: 10
  },
  {
    id: "project-3",
    name: "Industriehalle Technik AG",
    status: "Abgeschlossen",
    startDate: "2023-03-10",
    endDate: "2023-07-22",
    manager: "Anna Schmidt",
    location: "Industrieweg 45, Hamburg",
    client: "Technik AG",
    notes: "Wärmepumpen-Contracting für Produktionshalle",
    progress: 100
  }
];

// Mock Checklist Items
export const mockChecklistItems: ChecklistItem[] = [
  {
    id: "checklist-1",
    projectId: "project-1",
    category: "Projektstart",
    description: "Erstbegehung durchführen",
    isRequired: true,
    status: "Erledigt",
    responsible: "Max Mustermann",
    plannedDate: "2023-09-05",
    completedDate: "2023-09-05",
    documents: [],
    notes: "Begehung mit Kunden erfolgreich durchgeführt"
  },
  {
    id: "checklist-2",
    projectId: "project-1",
    category: "Planung",
    description: "Wärmequellenanalyse",
    isRequired: true,
    status: "Erledigt",
    responsible: "Anna Schmidt",
    plannedDate: "2023-09-12",
    completedDate: "2023-09-14",
    documents: ["analyse.pdf"],
    notes: "Geothermie als primäre Wärmequelle festgelegt"
  },
  {
    id: "checklist-3",
    projectId: "project-1",
    category: "Technik",
    description: "Technische Planung Hydraulik",
    isRequired: true,
    status: "In Bearbeitung",
    responsible: "Anna Schmidt",
    plannedDate: "2023-09-20",
    completedDate: null,
    documents: [],
    notes: "Erster Entwurf fertiggestellt, Überarbeitung nach Kundenfeedback nötig"
  },
  {
    id: "checklist-4",
    projectId: "project-1",
    category: "Subunternehmer",
    description: "Bohrfirma beauftragen",
    isRequired: true,
    status: "Offen",
    responsible: "Max Mustermann",
    plannedDate: "2023-10-01",
    completedDate: null,
    documents: [],
    notes: "Angebote von 3 Firmen eingeholt, Entscheidung steht aus"
  },
  {
    id: "checklist-5",
    projectId: "project-1",
    category: "Ausführung",
    description: "Wärmepumpen-Installation",
    isRequired: true,
    status: "Offen",
    responsible: "Peter Meyer",
    plannedDate: "2023-11-15",
    completedDate: null,
    documents: [],
    notes: ""
  },
  {
    id: "checklist-6",
    projectId: "project-2",
    category: "Projektstart",
    description: "Vertrag unterzeichnen",
    isRequired: true,
    status: "Erledigt",
    responsible: "Max Mustermann",
    plannedDate: "2023-10-20",
    completedDate: "2023-10-18",
    documents: ["vertrag.pdf"],
    notes: "Vertrag wurde vorzeitig unterzeichnet"
  },
  {
    id: "checklist-7",
    projectId: "project-2",
    category: "Planung",
    description: "Bestandsaufnahme",
    isRequired: true,
    status: "Offen",
    responsible: "Anna Schmidt",
    plannedDate: "2023-11-10",
    completedDate: null,
    documents: [],
    notes: "Termin mit Kunden vereinbart"
  }
];

// Mock Project Roles
export const mockProjectRoles: ProjectRole[] = [
  {
    id: "role-1",
    projectId: "project-1",
    userId: "user-1",
    role: "Projektleiter"
  },
  {
    id: "role-2",
    projectId: "project-1",
    userId: "user-2",
    role: "Technischer Planer"
  },
  {
    id: "role-3",
    projectId: "project-1",
    userId: "user-3",
    role: "Subunternehmer"
  },
  {
    id: "role-4",
    projectId: "project-2",
    userId: "user-1",
    role: "Projektleiter"
  },
  {
    id: "role-5",
    projectId: "project-2",
    userId: "user-4",
    role: "Kunde"
  },
  {
    id: "role-6",
    projectId: "project-3",
    userId: "user-2",
    role: "Projektleiter"
  },
  {
    id: "role-7",
    projectId: "project-3",
    userId: "user-3",
    role: "Subunternehmer"
  }
];
