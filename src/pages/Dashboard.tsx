
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 max-w-2xl w-full mx-auto p-6 px-4">
      <Card className="bg-card/80 shadow-xl">
        <CardContent>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-ethic-accent">{title}</h2>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}

function ShadowMode() {
  const [testing, setTesting] = useState(false);
  return (
    <SectionWrapper title="Shadow Mode">
      <p className="mb-4 text-muted-foreground">Run tests in the background without affecting decisions.</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="bg-ethic-green text-white text-lg px-8 py-4 rounded-xl shadow-md hover:bg-ethic-green/90 transition-all"
            onClick={() => setTesting(v => !v)}
          >
            {testing ? "Testing..." : "Start Test"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Simulates AI decisions. Reports shown after test.</TooltipContent>
      </Tooltip>
    </SectionWrapper>
  );
}

function PrivacyVisualizer() {
  return (
    <SectionWrapper title="Privacy Visualizer">
      <p className="mb-4 text-muted-foreground">Visualize your data flow through the AI system.</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            variant="secondary"
            className="bg-ethic-accent text-white text-lg px-8 py-4 rounded-xl hover:bg-ethic-accent/90 transition-all"
          >
            View Flow
          </Button>
        </TooltipTrigger>
        <TooltipContent>See an interactive map of your data usage.</TooltipContent>
      </Tooltip>
    </SectionWrapper>
  );
}

function ConsentManager() {
  return (
    <SectionWrapper title="Consent Manager">
      <p className="mb-4 text-muted-foreground">Choose and review what data you share with EthicGuard AI.</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="bg-blue-500 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-600 transition-all"
          >
            Manage Consent
          </Button>
        </TooltipTrigger>
        <TooltipContent>Adjust your privacy settings, anytime.</TooltipContent>
      </Tooltip>
    </SectionWrapper>
  );
}

function RiskMonitor() {
  return (
    <SectionWrapper title="Risk Monitor">
      <p className="mb-4 text-muted-foreground">Detect real-time risks and ethical flags in your AI activities.</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="bg-ethic-green text-white text-lg px-8 py-4 rounded-xl shadow-sm hover:bg-ethic-green/90 transition-all"
          >
            Download Report
          </Button>
        </TooltipTrigger>
        <TooltipContent>Get a downloadable risk report summary.</TooltipContent>
      </Tooltip>
    </SectionWrapper>
  );
}

function Settings() {
  // Dummy dark mode toggle
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  return (
    <SectionWrapper title="Settings">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground mr-2">Theme:</span>
          <Button onClick={toggleDark} className="flex items-center gap-2 px-4">
            {darkMode ? <Sun /> : <Moon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
        <div>
          <p className="text-muted-foreground">Profile and account settings will go here.</p>
        </div>
      </div>
    </SectionWrapper>
  );
}

const tabMap: Record<string, React.ReactNode> = {
  "shadow": <ShadowMode />,
  "visualizer": <PrivacyVisualizer />,
  "consent": <ConsentManager />,
  "risk": <RiskMonitor />,
  "settings": <Settings />,
};

const defaultTab = "/dashboard/shadow";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current tab route (/dashboard/:tab)
  const tab = location.pathname.split("/")[2] || "shadow";
  if (!tabMap[tab]) {
    navigate(defaultTab, { replace: true });
    return null;
  }

  return (
    <div className={clsx(
      "dark min-h-screen flex w-full bg-background",
      "flex-col md:flex-row"
    )}>
      {/* Sidebar */}
      <DashboardSidebar />
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-2 bg-background min-h-screen">
        <header className="w-full flex items-center px-2 py-3 mb-4 border-b border-muted bg-card/80 sticky top-0 z-40">
          <span className="text-2xl md:text-3xl font-extrabold gradient-text tracking-tight select-none">
            EthicGuard AI
          </span>
        </header>
        {tabMap[tab]}
      </main>
    </div>
  );
}
