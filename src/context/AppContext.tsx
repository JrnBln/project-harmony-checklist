
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, ChecklistItem, User, ProjectRole } from '@/types/models';

// Import mock data
import { mockProjects, mockChecklistItems, mockUsers, mockProjectRoles } from '@/data/mockData';

interface AppContextType {
  projects: Project[];
  checklistItems: ChecklistItem[];
  users: User[];
  projectRoles: ProjectRole[];
  currentUser: User | null;
  
  // Project actions
  addProject: (project: Omit<Project, 'id' | 'progress'>) => string;
  updateProject: (projectId: string, updates: Partial<Omit<Project, 'id'>>) => void;
  deleteProject: (projectId: string) => void;
  
  // Checklist actions
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => string;
  updateChecklistItem: (itemId: string, updates: Partial<Omit<ChecklistItem, 'id'>>) => void;
  deleteChecklistItem: (itemId: string) => void;
  
  // User & role actions
  setCurrentUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(mockChecklistItems);
  const [users] = useState<User[]>(mockUsers);
  const [projectRoles] = useState<ProjectRole[]>(mockProjectRoles);
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Default to first user
  
  // Project functions
  const addProject = (project: Omit<Project, 'id' | 'progress'>) => {
    const id = `project-${Date.now()}`;
    const newProject: Project = { 
      ...project, 
      id,
      progress: 0
    };
    
    setProjects([...projects, newProject]);
    return id;
  };
  
  const updateProject = (projectId: string, updates: Partial<Omit<Project, 'id'>>) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
    
    // Recalculate progress if needed
    if (updates.progress === undefined) {
      updateProjectProgress(projectId);
    }
  };
  
  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    // Also delete associated checklist items
    setChecklistItems(checklistItems.filter(item => item.projectId !== projectId));
  };
  
  // Checklist functions
  const addChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const id = `checklist-${Date.now()}`;
    const newItem: ChecklistItem = { ...item, id };
    
    setChecklistItems([...checklistItems, newItem]);
    
    // Update project progress
    updateProjectProgress(item.projectId);
    
    return id;
  };
  
  const updateChecklistItem = (itemId: string, updates: Partial<Omit<ChecklistItem, 'id'>>) => {
    let projectId = '';
    
    setChecklistItems(checklistItems.map(item => {
      if (item.id === itemId) {
        projectId = item.projectId;
        return { ...item, ...updates };
      }
      return item;
    }));
    
    // Update project progress if status was updated
    if (projectId && (updates.status !== undefined || updates.isRequired !== undefined)) {
      updateProjectProgress(projectId);
    }
  };
  
  const deleteChecklistItem = (itemId: string) => {
    const item = checklistItems.find(i => i.id === itemId);
    if (!item) return;
    
    const projectId = item.projectId;
    setChecklistItems(checklistItems.filter(item => item.id !== itemId));
    
    // Update project progress
    updateProjectProgress(projectId);
  };
  
  // Helper to update project progress based on checklist items
  const updateProjectProgress = (projectId: string) => {
    const projectItems = checklistItems.filter(item => item.projectId === projectId);
    const requiredItems = projectItems.filter(item => item.isRequired);
    
    if (requiredItems.length === 0) {
      updateProject(projectId, { progress: 0 });
      return;
    }
    
    const completedRequiredItems = requiredItems.filter(item => item.status === 'Erledigt');
    const progress = Math.round((completedRequiredItems.length / requiredItems.length) * 100);
    
    updateProject(projectId, { progress });
  };
  
  const value = {
    projects,
    checklistItems,
    users,
    projectRoles,
    currentUser,
    
    addProject,
    updateProject,
    deleteProject,
    
    addChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    
    setCurrentUser,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
