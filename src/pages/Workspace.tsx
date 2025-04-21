
import { useState } from "react";
import {
  Shield,
  Eye,
  UserCheck,
  Monitor,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sidebar menu data
const menuItems = [
  { key: "shadow", label: "Shadow Mode", icon: Shield },
  { key: "visualizer", label: "Privacy Visualizer", icon: Eye },
  { key: "consent", label: "Consent Manager", icon: UserCheck },
  { key: "risk", label: "Real-Time Risk Monitor", icon: Monitor },
  { key: "settings", label: "Settings", icon: Settings },
];

// Section components (real, functional versions)
function ShadowModeSection() {
  const [testing, setTesting] = useState(false);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-ethic-green">Shadow Mode</h2>
      <p className="mb-4 text-muted-foreground">
        Run AI decisions in parallel to human ones—see outcomes safely before deploying live!
      </p>
      <Button
        size="lg"
        className="bg-ethic-green text-white text-lg px-8 py-4 rounded-xl shadow-md hover:bg-ethic-green/90 transition-all"
        onClick={() => setTesting((v) => !v)}
      >
        {testing ? "Running AI Test..." : "Start Shadow AI Test"}
      </Button>
      {testing && (
        <div className="text-ethic-green mt-4">✅ Simulated decisions in progress...</div>
      )}
    </div>
  );
}

function PrivacyVisualizerSection() {
  const [showMap, setShowMap] = useState(false);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-ethic-accent">Privacy Visualizer</h2>
      <p className="mb-4 text-muted-foreground">
        Visualize how your data flows through the AI system.
      </p>
      <Button
        size="lg"
        variant="secondary"
        className="bg-ethic-accent text-white text-lg px-8 py-4 rounded-xl hover:bg-ethic-accent/90 transition-all"
        onClick={() => setShowMap((v) => !v)}
      >
        {showMap ? "Hide Data Flow" : "View Data Flow"}
      </Button>
      {showMap && (
        <div className="mt-6">
          <div className="bg-ethic-midgray rounded-lg p-4">
            <div className="text-ethic-green font-semibold">
              🟢 Personal Info → AI Model → Decisions
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              (*This could be replaced with a real graph or chart*)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConsentManagerSection() {
  const [consents, setConsents] = useState({
    analytics: false,
    storage: false,
    partners: false,
  });
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-ethic-navy">Consent Manager</h2>
      <p className="mb-4 text-muted-foreground">
        You can control what types of data you're willing to share with the AI.
      </p>
      <div className="space-y-2">
        {[
          { key: "analytics", label: "Allow AI Analytics" },
          { key: "storage", label: "Permit Data Storage" },
          { key: "partners", label: "Share with Research Partners" },
        ].map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={consents[item.key as keyof typeof consents]}
              className="w-5 h-5 accent-ethic-green"
              onChange={() =>
                setConsents((c) => ({ ...c, [item.key]: !c[item.key as keyof typeof consents] }))
              }
              id={`consent_${item.key}`}
            />
            <label
              htmlFor={`consent_${item.key}`}
              className="text-md text-muted-foreground cursor-pointer"
            >
              {item.label}
            </label>
          </div>
        ))}
        <Button
          size="lg"
          className="mt-4 bg-blue-600 text-white"
          onClick={() => alert("Preferences saved!")}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

function RiskMonitorSection() {
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Potential privacy risk in loan application", level: "high" },
    { id: 2, message: "Bias detected in recommendation", level: "medium" },
  ]);
  const [showHidden, setShowHidden] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-red-700">Real-Time Risk Monitor</h2>
      <p className="mb-4 text-muted-foreground">
        This monitor detects and lists current risks and ethical flags for your AI models.
      </p>
      <div className="space-y-3">
        {alerts
          .filter((a) => showHidden || a.level !== "medium")
          .map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.level === "high"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-yellow-50 border-yellow-200 text-yellow-700"
              }`}
            >
              {alert.message}
            </div>
          ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={() => setShowHidden((v) => !v)}
      >
        {showHidden ? "Hide Medium Risks" : "Show All Alerts"}
      </Button>
    </div>
  );
}

function SettingsSection() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-ethic-navy">Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground mr-2">Theme:</span>
          <Button onClick={toggleDark} className="flex items-center gap-2 px-4">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
        <div>
          <p className="text-muted-foreground">Profile and account settings will go here.</p>
        </div>
      </div>
    </div>
  );
}

const sectionMap: Record<string, React.ReactNode> = {
  shadow: <ShadowModeSection />,
  visualizer: <PrivacyVisualizerSection />,
  consent: <ConsentManagerSection />,
  risk: <RiskMonitorSection />,
  settings: <SettingsSection />,
};

export default function Workspace() {
  const [current, setCurrent] = useState("shadow");

  return (
    <div className="flex w-full min-h-screen bg-background font-sans">
      {/* Sidebar */}
      <aside className="bg-sidebar dark:bg-ethic-navy text-sidebar-foreground w-64 min-h-screen shadow-lg p-4 flex flex-col items-start gap-1">
        <div className="text-lg font-bold mb-6 text-ethic-green pl-2">Workspace</div>
        <nav className="flex flex-col w-full gap-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all text-base font-medium
                ${current === item.key
                  ? "bg-ethic-green/90 text-white shadow"
                  : "hover:bg-ethic-green/20 text-ethic-midgray"
                }`}
              onClick={() => setCurrent(item.key)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Section content */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6 bg-background min-h-screen">
        <div className="w-full max-w-3xl">{sectionMap[current]}</div>
      </main>
    </div>
  );
}

