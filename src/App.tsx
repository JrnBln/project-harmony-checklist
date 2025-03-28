
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import ProjectDetail from "@/pages/ProjectDetail";
import ProjectForm from "@/pages/ProjectForm";
import ChecklistItemForm from "@/pages/ChecklistItemForm";
import TechnicalDataForm from "@/pages/TechnicalDataForm";
import SystemDesignForm from "@/pages/SystemDesignForm";
import ImplementationForm from "@/pages/ImplementationForm";
import OperationForm from "@/pages/OperationForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/projects/new" element={<ProjectForm />} />
                <Route path="/projects/:projectId/edit" element={<ProjectForm />} />
                <Route path="/projects/:projectId/checklist/new" element={<ChecklistItemForm />} />
                <Route path="/projects/:projectId/technical-data" element={<TechnicalDataForm />} />
                <Route path="/projects/:projectId/system-design" element={<SystemDesignForm />} />
                <Route path="/projects/:projectId/implementation" element={<ImplementationForm />} />
                <Route path="/projects/:projectId/operation" element={<OperationForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
