
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Workspace from "@/pages/Workspace";
import RiskAnalysis from "@/pages/RiskAnalysis";
import ShadowModeTester from "@/components/ShadowModeTester";
import PrivacyVisualizer from "@/components/PrivacyVisualizer";
import ConsentManager from "@/components/ConsentManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/dashboard/shadow" element={<ShadowModeTester />} />
          <Route path="/dashboard/visualizer" element={<PrivacyVisualizer />} />
          <Route path="/dashboard/consent" element={<ConsentManager />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
