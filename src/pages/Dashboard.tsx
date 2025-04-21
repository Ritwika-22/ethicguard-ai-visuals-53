
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sun, Moon, Play, Settings as SettingsIcon, Bell, Globe, Lock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
      <p className="mb-4 text-muted-foreground">
        Run AI decisions in parallel to human ones—see outcomes safely before deploying live!
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="bg-ethic-green text-white text-lg px-8 py-4 rounded-xl shadow-md hover:bg-ethic-green/90 transition-all"
            onClick={() => setTesting((v) => !v)}
          >
            {testing ? "Running AI Test..." : "Start Shadow AI Test"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Runs a background simulation of real cases with your AI.
        </TooltipContent>
      </Tooltip>
      {testing && (
        <div className="text-ethic-green mt-4">✅ Simulated decisions in progress... (This could update in real time!)</div>
      )}
    </SectionWrapper>
  );
}

function PrivacyVisualizer() {
  const [showMap, setShowMap] = useState(false);
  return (
    <SectionWrapper title="Privacy Visualizer">
      <p className="mb-4 text-muted-foreground">
        Visualize how your data flows through the AI system.
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            variant="secondary"
            className="bg-ethic-accent text-white text-lg px-8 py-4 rounded-xl hover:bg-ethic-accent/90 transition-all"
            onClick={() => setShowMap((v) => !v)}
          >
            {showMap ? "Hide Data Flow" : "View Data Flow"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Show or hide data movement map.
        </TooltipContent>
      </Tooltip>
      {showMap && (
        <div className="mt-6">
          <div className="bg-ethic-midgray rounded-lg p-4">
            <div className="text-ethic-green font-semibold">🟢 Personal Info → AI Model → Decisions</div>
            <div className="text-xs mt-1 text-muted-foreground">(*This graphic can be replaced with a real graph or chart*)</div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

function ConsentManager() {
  const [consents, setConsents] = useState({
    analytics: false,
    storage: false,
    partners: false,
  });
  return (
    <SectionWrapper title="Consent Manager">
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
    </SectionWrapper>
  );
}

function RiskMonitor() {
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Potential privacy risk in loan application", level: "high" },
    { id: 2, message: "Bias detected in recommendation", level: "medium" },
  ]);
  const [showHidden, setShowHidden] = useState(false);

  return (
    <SectionWrapper title="Real-Time Risk Monitor">
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
    </SectionWrapper>
  );
}

function Settings() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(false);
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setDarkMode(true);
  }, []);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    toast({
      title: isDark ? "Dark mode enabled" : "Light mode enabled",
      description: `You've switched to ${isDark ? "dark" : "light"} mode.`
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    toast({
      title: "Language updated",
      description: `Language preference saved to ${e.target.value}.`
    });
  };

  const handleSettingToggle = (setting: string, value: boolean) => {
    toast({
      title: `${setting} ${value ? "enabled" : "disabled"}`,
      description: `You've ${value ? "enabled" : "disabled"} ${setting.toLowerCase()}.`
    });
  };

  return (
    <SectionWrapper title="Settings">
      <div className="space-y-6">
        {/* Appearance Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-ethic-green" />
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between dark and light mode
                </p>
              </div>
              <Button onClick={toggleDark} className="flex items-center gap-2">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="language-select">Language</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language
                </p>
              </div>
              <select
                id="language-select"
                value={language}
                onChange={handleLanguageChange}
                className="bg-background border border-input rounded-md py-2 px-3"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </div>
        
        <Separator />

        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5 text-ethic-green" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications-toggle">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts about system events
                </p>
              </div>
              <Switch
                id="notifications-toggle"
                checked={notificationsEnabled}
                onCheckedChange={(checked) => {
                  setNotificationsEnabled(checked);
                  handleSettingToggle("Notifications", checked);
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autosave-toggle">Auto-save</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your work
                </p>
              </div>
              <Switch
                id="autosave-toggle"
                checked={autoSaveEnabled}
                onCheckedChange={(checked) => {
                  setAutoSaveEnabled(checked);
                  handleSettingToggle("Auto-save", checked);
                }}
              />
            </div>
          </div>
        </div>
        
        <Separator />

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5 text-ethic-green" />
            Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-collection-toggle">Data Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous usage data collection
                </p>
              </div>
              <Switch
                id="data-collection-toggle"
                checked={dataCollectionEnabled}
                onCheckedChange={(checked) => {
                  setDataCollectionEnabled(checked);
                  handleSettingToggle("Data collection", checked);
                }}
              />
            </div>
            
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Privacy policy",
                    description: "Privacy policy would open in a new tab."
                  });
                }}
              >
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Account Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-ethic-green" />
            Account
          </h3>
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "Profile settings",
                  description: "Profile settings would open here."
                });
              }}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Account password",
                  description: "Password change dialog would open here."
                });
              }}
            >
              Change Password
            </Button>
            <Button
              variant="destructive"
              className="mt-2"
              onClick={() => {
                toast({
                  title: "Action required",
                  description: "Account deletion requires confirmation.",
                  variant: "destructive"
                });
              }}
            >
              Delete Account
            </Button>
          </div>
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

  const tab = location.pathname.split("/")[2] || "shadow";

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  if (!tabMap[tab]) {
    navigate(defaultTab, { replace: true });
    return null;
  }

  return (
    <div className="dark min-h-screen flex w-full bg-background flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-2 bg-background min-h-screen">
        <header className="w-full flex items-center px-2 py-3 mb-4 border-b border-muted bg-card/80 sticky top-0 z-40">
          <span className="text-2xl md:text-3xl font-extrabold gradient-text tracking-tight select-none">
            EthicGuard AI
          </span>
          <div className="ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        </header>

        {tabMap[tab]}

        <div className="mt-10 w-full max-w-2xl px-6">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/")}
            aria-label="Back to Home Page"
          >
            ← Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
}
