import { useState } from "react";
import {
  Shield,
  Eye,
  UserCheck,
  Monitor,
  Settings as SettingsIcon,
  ToggleLeft,
  ToggleRight,
  Bell,
  BellOff,
  CircleCheck,
  CircleX,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ShadowModeTester from "@/components/ShadowModeTester";
import PrivacyVisualizer from "@/components/PrivacyVisualizer";

const WorkspaceTab = ({ 
  active, 
  label, 
  icon: Icon, 
  onClick 
}: { 
  active: boolean; 
  label: string; 
  icon: React.ElementType; 
  onClick: () => void;
}) => (
  <button
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active 
        ? "bg-shadow-card text-ethic-green border-l-4 border-ethic-green pl-3" 
        : "text-shadow-secondary hover:bg-shadow-highlight"
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
    <div className="min-h-screen bg-shadow-background text-shadow-foreground flex flex-col md:flex-row">
      {/* Side Navigation */}
      <div className="md:w-64 p-4 bg-shadow-card border-r border-shadow-border">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ethic-green">EthicGuard</h1>
          <p className="text-shadow-secondary text-sm">AI Testing Workspace</p>
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
            <Button variant="outline" className="w-full border-shadow-border text-shadow-secondary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {activeTab === "shadow" && <ShadowModeTester />}
        
        {activeTab === "privacy" && (
          <PrivacyVisualizer />
        )}
        
        {activeTab === "consent" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Consent Manager</h2>
            <p className="text-shadow-secondary">
              Configure and manage user consent options for AI interactions.
            </p>
            <div className="p-12 text-center text-shadow-secondary bg-shadow-card rounded-lg mt-8 border border-shadow-border">
              <UserCheck className="w-12 h-12 mx-auto mb-4 text-ethic-accent opacity-50" />
              <p>Consent Manager functionality would be implemented here.</p>
            </div>
          </div>
        )}
        
        {activeTab === "risk" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Risk Monitor</h2>
            <p className="text-shadow-secondary">
              Monitor and respond to potential ethical risks in real-time.
            </p>
            <div className="p-12 text-center text-shadow-secondary bg-shadow-card rounded-lg mt-8 border border-shadow-border">
              <Monitor className="w-12 h-12 mx-auto mb-4 text-ethic-accent opacity-50" />
              <p>Risk Monitor functionality would be implemented here.</p>
            </div>
          </div>
        )}
        
        {activeTab === "settings" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-shadow-secondary">
              Configure your workspace preferences and account settings.
            </p>
            <div className="p-12 text-center text-shadow-secondary bg-shadow-card rounded-lg mt-8 border border-shadow-border">
              <SettingsIcon className="w-12 h-12 mx-auto mb-4 text-ethic-accent opacity-50" />
              <p>Settings functionality would be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
