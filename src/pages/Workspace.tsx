
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
import { toast } from "@/hooks/use-toast"; // shadcn use-toast

const sections = [
  { key: "shadow", label: "Shadow Mode", icon: Shield },
  { key: "visualizer", label: "Privacy Visualizer", icon: Eye },
  { key: "consent", label: "Consent Manager", icon: UserCheck },
  { key: "risk", label: "Real-Time Risk Monitor", icon: Monitor },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

// Section Components (moved from previous flat structure)
function ShadowModeSection() {
  const [testing, setTesting] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const startTest = () => {
    setTesting(true);
    setLog([]);
    toast({
      title: "Shadow Mode activated",
      description: "AI decisions are now running in test mode."
    });
    setTimeout(() => setLog((l) => [...l, "AI simulated decision: Approve ✓"]), 1400);
    setTimeout(() => setLog((l) => [...l, "AI simulated decision: Flag for review"]), 2500);
    setTimeout(() => setLog((l) => [...l, "AI simulated decision: Reject ✗"]), 3900);
    setTimeout(() => setTesting(false), 5000);
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-3 text-ethic-green flex items-center gap-2">
        <Shield className="w-6 h-6" /> Shadow Mode
      </h2>
      <p className="mb-4 text-muted-foreground">
        Run AI decisions in parallel to human ones—see outcomes safely before deploying live!
      </p>
      {!testing ? (
        <Button
          size="lg"
          className="bg-ethic-green text-white text-lg px-8 py-4 rounded-xl shadow-md hover:bg-ethic-green/90 transition-all"
          onClick={startTest}
          disabled={testing}
        >
          Start Shadow AI Test
        </Button>
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="text-ethic-green border-ethic-green"
          disabled
        >
          Running AI Test...
        </Button>
      )}
      <div className="mt-4 space-y-2">
        {testing && (
          <div className="text-ethic-green animate-pulse font-medium">
            ✅ Simulated decisions in progress...
          </div>
        )}
        {log.map((item, idx) => (
          <div
            key={idx}
            className="rounded bg-ethic-lightgray px-3 py-2 text-ethic-navy text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function PrivacyVisualizerSection() {
  const [showMap, setShowMap] = useState(false);
  const [dataLevel, setDataLevel] = useState([30]);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-3 text-ethic-accent flex items-center gap-2">
        <Eye className="w-6 h-6" /> Privacy Visualizer
      </h2>
      <p className="mb-4 text-muted-foreground">
        Visualize how your personal data flows through the AI system.
      </p>
      <div className="flex items-center gap-3">
        <Switch
          checked={showMap}
          onCheckedChange={setShowMap}
          aria-label="Toggle Data Flow Visualization"
        />
        <span>{showMap ? "Hide Data Flow" : "Show Data Flow"}</span>
        <Button
          size="sm"
          variant="secondary"
          className="bg-ethic-accent text-white rounded-lg px-4 py-2 ml-3"
          onClick={() => setShowMap((v) => !v)}
        >
          {showMap ? "Hide" : "View"}
        </Button>
      </div>
      <div className="mt-6 max-w-md">
        <label className="block font-semibold mb-2 text-sm">
          Data Detail Level
        </label>
        <Slider
          min={0}
          max={100}
          step={10}
          value={dataLevel}
          onValueChange={setDataLevel}
          className=""
        />
        <div className="text-xs mt-1 text-muted-foreground">
          Visualization granularity: <span className="font-bold">{dataLevel[0]}</span>%
        </div>
      </div>
      {showMap && (
        <div className="mt-6 animate-fade-in">
          <div className="bg-ethic-midgray rounded-lg p-4 shadow">
            <div className="text-ethic-green font-semibold flex items-center gap-2">
              🟢 Personal Info <SlidersHorizontal className="w-4 h-4" /> AI Model <Eye className="w-4 h-4" /> Decisions
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              (This is a mock visualization.)
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ConsentManagerSection() {
  const [consents, setConsents] = useState({
    analytics: false,
    storage: false,
    partners: false,
  });
  const [saving, setSaving] = useState(false);

  const saveConsents = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Preferences saved",
        description: "Your consent preferences have been updated.",
        duration: 1800
      });
    }, 850);
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-3 text-ethic-navy flex items-center gap-2">
        <UserCheck className="w-6 h-6" /> Consent Manager
      </h2>
      <p className="mb-4 text-muted-foreground">
        You can control what types of data you're willing to share with the AI.
      </p>
      <div className="space-y-4">
        {[
          { key: "analytics", label: "Allow AI Analytics", icon: CircleCheck },
          { key: "storage", label: "Permit Data Storage", icon: CircleCheck },
          { key: "partners", label: "Share with Research Partners", icon: CircleCheck },
        ].map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <Switch
              id={`consent_${item.key}`}
              checked={consents[item.key as keyof typeof consents]}
              onCheckedChange={() =>
                setConsents((c) => ({
                  ...c,
                  [item.key]: !c[item.key as keyof typeof consents],
                }))
              }
              aria-label={item.label}
            />
            <label
              htmlFor={`consent_${item.key}`}
              className="text-md text-muted-foreground cursor-pointer flex items-center gap-1"
            >
              <item.icon className="w-4 h-4 text-ethic-green" /> {item.label} {consents[item.key as keyof typeof consents] ? <span className="ml-1 text-ethic-green font-semibold">Active</span> : <span className="ml-1 text-gray-400">Off</span>}
            </label>
          </div>
        ))}
        <Button
          size="lg"
          className="mt-4 bg-blue-600 text-white"
          onClick={saveConsents}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </section>
  );
}

function RiskMonitorSection() {
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Potential privacy risk in loan application", level: "high", active: true },
    { id: 2, message: "Bias detected in recommendation", level: "medium", active: true },
    { id: 3, message: "Personal data access spike by partner", level: "high", active: true },
  ]);
  const [showInactive, setShowInactive] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const toggleAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, active: !a.active } : a
      )
    );
    toast({
      title: "Alert updated",
      description: "The selected alert is now marked as resolved or re-activated.",
      duration: 1500,
    });
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-3 text-red-700 flex items-center gap-2">
        <Monitor className="w-6 h-6" /> Real-Time Risk Monitor
      </h2>
      <p className="mb-4 text-muted-foreground">
        This monitor detects and lists current risks and ethical flags for your AI models.
      </p>
      <div className="flex items-center gap-3 mb-5">
        <Switch
          checked={alertsEnabled}
          onCheckedChange={setAlertsEnabled}
          aria-label="Toggle Risk Alerts"
        />
        <span>{alertsEnabled ? <><Bell className="inline w-5 h-5 mr-1" /> Alerts On</> : <><BellOff className="inline w-5 h-5 mr-1" /> Alerts Off</>}</span>
      </div>
      <div className="space-y-3">
        {alerts
          .filter(a => alertsEnabled && (showInactive || a.active))
          .map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border flex items-center justify-between ${
                alert.level === "high"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-yellow-50 border-yellow-200 text-yellow-700"
              }`}
            >
              <span>
                {alert.message}
                {!alert.active && (
                  <span className="ml-2 text-gray-400 text-sm font-medium">(Resolved)</span>
                )}
              </span>
              <Button
                variant={alert.active ? "destructive" : "outline"}
                size="sm"
                className="ml-4"
                onClick={() => toggleAlert(alert.id)}
              >
                {alert.active ? (
                  <>
                    <CircleX className="w-4 h-4 mr-1" /> Mark Resolved
                  </>
                ) : (
                  <>
                    <CircleCheck className="w-4 h-4 mr-1 text-ethic-green" /> Re-activate
                  </>
                )}
              </Button>
            </div>
          ))}
        {alertsEnabled && alerts.filter(a => showInactive || a.active).length === 0 && (
          <div className="p-4 rounded-lg text-center text-gray-400">
            No active alerts to display.
          </div>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => setShowInactive((v) => !v)}
      >
        {showInactive ? "Hide Resolved Alerts" : "Show All Alerts"}
      </Button>
    </section>
  );
}

function SettingsSection() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const [profileName, setProfileName] = useState("EthicAI User");
  const [saving, setSaving] = useState(false);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    toast({
      title: "Theme changed",
      description: isDark ? "Dark mode enabled." : "Light mode enabled.",
      duration: 1800,
    });
  };

  const handleProfileSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your username was saved.",
      });
    }, 1000);
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-3 text-ethic-navy flex items-center gap-2">
        <SettingsIcon className="w-6 h-6" /> Settings
      </h2>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground mr-2">Theme:</span>
          <Button onClick={toggleDark} className="flex items-center gap-2 px-4">
            {darkMode ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
        <div>
          <label className="block font-medium mb-2">Profile Name</label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="border px-3 py-2 rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-ethic-green"
          />
          <Button
            className="ml-2 mt-2"
            size="sm"
            onClick={handleProfileSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Workspace() {
  const [activeSection, setActiveSection] = useState(sections[0].key);

  function renderActiveSection() {
    switch (activeSection) {
      case "shadow":
        return <ShadowModeSection />;
      case "visualizer":
        return <PrivacyVisualizerSection />;
      case "consent":
        return <ConsentManagerSection />;
      case "risk":
        return <RiskMonitorSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  }

  return (
    <div className="flex w-full min-h-screen bg-background font-sans">
      {/* Side panel */}
      <aside className="min-w-[220px] max-w-xs bg-ethic-lightgray dark:bg-ethic-navy/80 py-8 px-2 flex flex-col gap-2 border-r border-ethic-midgray shadow-lg">
        <div className="mb-5 px-4">
          <span className="text-xl font-extrabold tracking-tight gradient-text select-none">
            Dashboard
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {sections.map((section) => (
            <Button
              key={section.key}
              variant={activeSection === section.key ? "secondary" : "ghost"}
              className={`justify-start px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3
                ${activeSection === section.key
                  ? "bg-ethic-accent/10 text-ethic-accent"
                  : "text-ethic-navy dark:text-white hover:bg-ethic-accent/5"
                }
              `}
              onClick={() => setActiveSection(section.key)}
            >
              <section.icon className="w-5 h-5" />
              {section.label}
            </Button>
          ))}
        </nav>
      </aside>
      {/* Content panel */}
      <main className="flex-1 flex flex-col p-6 max-w-5xl mx-auto">
        {renderActiveSection()}
      </main>
    </div>
  );
}

