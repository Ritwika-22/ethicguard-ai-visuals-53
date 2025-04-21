import { useState } from "react";
import {
  Shield,
  Eye,
  UserCheck,
  Monitor,
  Settings as SettingsIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  Info,
  Zap,
  ShieldCheck,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ShadowModeTester from "@/components/ShadowModeTester";
import PrivacyVisualizer from "@/components/PrivacyVisualizer";
import ConsentManager from "@/components/ConsentManager";
import RiskMonitorPanel from "@/components/RiskMonitorPanel";

const WorkspaceTab = ({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}) => (
  <button
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active
        ? "bg-muted text-ethic-green border-l-4 border-ethic-green pl-3"
        : "text-muted-foreground hover:bg-muted-accent"
    }`}
    onClick={onClick}
  >
    <Icon className="mr-2 h-5 w-5" />
    <span>{label}</span>
  </button>
);

export default function Workspace() {
  const [activeTab, setActiveTab] = useState<string>("shadow");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Side Navigation */}
      <div className="md:w-64 p-4 bg-card border-r border-border">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ethic-green">EthicGuard</h1>
          <p className="text-muted-foreground text-sm">AI Testing Workspace</p>
        </div>

        <nav className="space-y-2">
          <WorkspaceTab
            active={activeTab === "shadow"}
            label="Shadow Mode"
            icon={Shield}
            onClick={() => setActiveTab("shadow")}
          />
          <WorkspaceTab
            active={activeTab === "privacy"}
            label="Privacy Visualizer"
            icon={Eye}
            onClick={() => setActiveTab("privacy")}
          />
          <WorkspaceTab
            active={activeTab === "consent"}
            label="Consent Manager"
            icon={UserCheck}
            onClick={() => setActiveTab("consent")}
          />
          <WorkspaceTab
            active={activeTab === "risk"}
            label="Risk Monitor"
            icon={Monitor}
            onClick={() => setActiveTab("risk")}
          />
          <WorkspaceTab
            active={activeTab === "settings"}
            label="Settings"
            icon={SettingsIcon}
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="mt-auto pt-6">
          <Link to="/">
            <Button
              variant="outline"
              className="w-full border-border text-muted-foreground"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-background p-6">
        {activeTab === "shadow" && <ShadowModeTester />}

        {activeTab === "privacy" && <PrivacyVisualizer />}

        {activeTab === "consent" && <ConsentManager />}

        {activeTab === "risk" && <RiskMonitorPanel />}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Settings</h2>
            <p className="text-muted-foreground">
              Configure your workspace preferences and account settings.
            </p>
            <div className="p-12 text-center text-muted-foreground bg-card rounded-lg border border-border mt-8">
              <SettingsIcon className="w-12 h-12 mx-auto mb-4 text-accent opacity-50" />
              <p>Settings functionality would be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
