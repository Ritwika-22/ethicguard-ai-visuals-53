
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sun, Moon, Play, Eye, UserCheck, Monitor, Settings as SettingsIcon, SlidersHorizontal, ToggleLeft, ToggleRight, Bell, BellOff, CircleCheck, CircleX } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

// Section wrapper for styling consistency.
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

// Shadow Mode section (interactive: simulates running a test)
function ShadowMode() {
  const [testing, setTesting] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const startTest = () => {
    setTesting(true);
    setLog([]);
    toast({
      title: "Shadow Mode activated",
      description: "AI decisions are now running in test mode."
    });
    setTimeout(() => setLog(l => [...l, "AI simulated decision: Approve ✓"]), 1400);
    setTimeout(() => setLog(l => [...l, "AI simulated decision: Flag for review"]), 2500);
    setTimeout(() => setLog(l => [...l, "AI simulated decision: Reject ✗"]), 3900);
    setTimeout(() => setTesting(false), 5000);
  };

  return (
    <SectionWrapper title="Shadow Mode">
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
    </SectionWrapper>
  );
}

// Privacy Visualizer section (interactive: launches viewer sample)
function PrivacyVisualizer() {
  const [showMap, setShowMap] = useState(false);
  const [dataLevel, setDataLevel] = useState([30]);
  return (
    <SectionWrapper title="Privacy Visualizer">
      <p className="mb-4 text-muted-foreground">
        Visualize how your data flows through the AI system.
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
          onClick={() => setShowMap(v => !v)}
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
    </SectionWrapper>
  );
}

// Consent Manager section (interactive: toggle consents)
function ConsentManager() {
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
    <SectionWrapper title="Consent Manager">
      <p className="mb-4 text-muted-foreground">
        You can control what types of data you're willing to share with the AI.
      </p>
      <div className="space-y-4">
        {[
          { key: "analytics", label: "Allow AI Analytics" },
          { key: "storage", label: "Permit Data Storage" },
          { key: "partners", label: "Share with Research Partners" },
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
              className="text-md text-muted-foreground cursor-pointer"
            >
              {item.label} {consents[item.key as keyof typeof consents] ? <span className="ml-1 text-ethic-green font-semibold">Active</span> : <span className="ml-1 text-gray-400">Off</span>}
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
    </SectionWrapper>
  );
}

// Real-Time Risk Monitor section (interactive: show alert)
function RiskMonitor() {
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
    <SectionWrapper title="Real-Time Risk Monitor">
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
    </SectionWrapper>
  );
}

// Settings section (interactive: toggle dark mode, edit profile name)
function Settings() {
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
    <SectionWrapper title="Settings">
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
    </SectionWrapper>
  );
}

const tabMap: Record<string, React.ReactNode> = {
  shadow: <ShadowMode />,
  visualizer: <PrivacyVisualizer />,
  consent: <ConsentManager />,
  risk: <RiskMonitor />,
  settings: <Settings />,
};

const defaultTab = "/dashboard/shadow";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current tab route (/dashboard/:tab)
  const tab = location.pathname.split("/")[2] || "shadow";

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Redirect to default if no match
  if (!tabMap[tab]) {
    navigate(defaultTab, { replace: true });
    return null;
  }

  return (
    <SidebarProvider>
      <div className="dark min-h-screen flex w-full bg-background flex-col md:flex-row">
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
    </SidebarProvider>
  );
}
