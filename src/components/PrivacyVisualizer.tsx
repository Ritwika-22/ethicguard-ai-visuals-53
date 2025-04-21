
import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  DeviceMobile,
  Activity,
  ArrowRight,
  Info,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Database,
  Users,
  Lock,
  Unlock,
  ShieldCheck,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

// Data type definitions
const DATA_TYPES = [
  {
    id: "name",
    label: "Name",
    icon: User,
    defaultSharing: "safe",
    tooltip: "Used for personalization.",
    details: {
      usage: "Shown in your profile and communications.",
      storage: "Stored encrypted on server.",
      access: "Only you & admin can see.",
    },
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    defaultSharing: "safe",
    tooltip: "Email used for login only.",
    details: {
      usage: "Used to sign in and notifications.",
      storage: "Encrypted on our servers.",
      access: "Only you & app server.",
    },
  },
  {
    id: "location",
    label: "Location",
    icon: MapPin,
    defaultSharing: "risky",
    tooltip: "Location shared with 3rd parties for ads.",
    details: {
      usage: "Personalized offers & ads.",
      storage: "Sent to analytics provider.",
      access: "App server, partners.",
    },
  },
  {
    id: "device",
    label: "Device Info",
    icon: DeviceMobile,
    defaultSharing: "optional",
    tooltip: "Device type shared to help with support.",
    details: {
      usage: "Troubleshooting & improvements.",
      storage: "Temporarily cached.",
      access: "You & support staff (if needed).",
    },
  },
  {
    id: "behavior",
    label: "Behavior/Usage",
    icon: Activity,
    defaultSharing: "optional",
    tooltip: "Used for UX research, with your permission.",
    details: {
      usage: "App improvement analytics.",
      storage: "Anonymized in analytics.",
      access: "Dev team (aggregate stats only).",
    },
  }
];

type SharingLevel = "safe" | "risky" | "optional";
type DataState = {
  [key in string]: {
    sharing: boolean;
    level: SharingLevel;
  }
};
const initialDataState: DataState = {};
DATA_TYPES.forEach(dt => {
  initialDataState[dt.id] = {
    sharing: true,
    level: dt.defaultSharing as SharingLevel,
  };
});

const FLOW_MAP = [
  { from: "user", to: "server" },
  { from: "server", to: "third" },
];

// Helper: color for link by data type & state
function getFlowStyle(dataLevel: SharingLevel, active: boolean) {
  if (!active) {
    return "stroke-gray-400 stroke-dasharray-[4,4] opacity-60";
  }
  if (dataLevel === "safe") return "stroke-green-500";
  if (dataLevel === "risky") return "stroke-red-500";
  if (dataLevel === "optional") return "stroke-gray-400 stroke-dasharray-[4,4]";
  return "stroke-gray-300";
}

// Helper: is risky flow active for alerts
function anyRiskyActive(dataState: DataState) {
  return Object.values(dataState).some(ds => ds.sharing && ds.level === "risky");
}

export default function PrivacyVisualizer() {
  const [dataState, setDataState] = useState<DataState>(initialDataState);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setDataState(prev => {
      const newSharing = !prev[id].sharing;
      toast({
        title: `Sharing for ${DATA_TYPES.find(dt=>dt.id===id)?.label} ${newSharing ? "enabled" : "disabled"}`,
        description: newSharing
          ? "Data sharing resumed."
          : "Sharing turned off. Flow simulated as stopped.",
      });
      // Close any open detail if turned off
      return {
        ...prev,
        [id]: { ...prev[id], sharing: newSharing },
      };
    });
    if (selectedId === id && !dataState[id].sharing) setSelectedId(null);
  };

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  // UI starts here
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full min-h-[640px] pt-4 bg-shadow-background animate-fade-in">
      {/* Left: Data Types */}
      <div className="w-full md:w-64 bg-shadow-card rounded-2xl p-4 shrink-0 border border-shadow-border flex flex-col gap-2 h-fit self-start">
        <h3 className="font-semibold text-shadow-foreground mb-2">Data Types</h3>
        {DATA_TYPES.map(dt => (
          <div
            key={dt.id}
            onClick={() => handleSelect(dt.id)}
            className={`flex items-center gap-2 px-2 py-2 rounded cursor-pointer group transition-all
              ${selectedId===dt.id ? "bg-ethic-accent/10 border-l-4 border-ethic-accent" : "hover:bg-shadow-muted"}`}
            tabIndex={0}
            aria-label={"Select "+dt.label}
          >
            <dt.icon className="text-shadow-secondary flex-shrink-0" size={22} />
            <span className="font-medium">{dt.label}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={15} className="ml-1 text-shadow-secondary group-hover:text-ethic-accent cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>{dt.tooltip}</TooltipContent>
            </Tooltip>
            <span className="ml-auto">
              <Switch
                checked={dataState[dt.id].sharing}
                aria-label={`Toggle sharing for ${dt.label}`}
                onCheckedChange={() => handleToggle(dt.id)}
              />
            </span>
          </div>
        ))}
      </div>
      {/* Center: Flow Map */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-[340px] py-4">
        <div className="mb-2 text-lg font-semibold">Data Flow Map</div>
        <div className="relative bg-shadow-card border border-shadow-border rounded-2xl p-2 sm:p-7 w-[340px] h-[340px] shadow flex items-center justify-center mx-auto">
          {/* SVG Flow Diagram */}
          <svg
            width={320}
            height={240}
            className="block"
            aria-label="Data flow diagram"
          >
            {/* User */}
            <g transform="translate(50,130)">
              <circle r="28" className="fill-ethic-accent/40 stroke-ethic-accent" />
              <User className="text-ethic-accent" size={26} x={-13} y={-13} />
              <text x="0" y="45" textAnchor="middle" className="fill-gray-600 font-medium text-xs">
                User
              </text>
            </g>
            {/* App/Server */}
            <g transform="translate(160,55)">
              <rect x="-36" y="-24" width="72" height="48" rx="16"
                className="fill-ethic-green/30 stroke-ethic-green" />
              <Database className="text-ethic-green" size={24} x={-13} y={-13} />
              <text x="0" y="36" textAnchor="middle" className="fill-gray-600 text-xs">
                App / Server
              </text>
            </g>
            {/* Third Parties */}
            <g transform="translate(270,130)">
              <ellipse rx="34" ry="26" className="fill-red-200/70 stroke-red-400" />
              <Users className="text-red-500" size={27} x={-13} y={-13} />
              <text x="0" y="41" textAnchor="middle" className="fill-gray-600 text-xs">
                Third Parties
              </text>
            </g>
            {/* Draw data flows for each data type */}
            {/* User → App/Server & Server → Third based on data type state */}
            {DATA_TYPES.map((dt, idx) => {
              // for stacking, assign vertical offset per type
              const yOffsets = [-50, -20, 0, 20, 50];
              const level = dataState[dt.id].level; // safe/risky/optional
              const active = dataState[dt.id].sharing;
              // User to App/Server
              return (
                <g key={dt.id}>
                  {/* User → App/Server */}
                  <line
                    x1={50+28}
                    y1={130 + yOffsets[idx]}
                    x2={160-36}
                    y2={55 + yOffsets[idx]}
                    className={`transition-all stroke-2 ${getFlowStyle(level, active)}`}
                  />
                  {/* App/Server → Third Parties */}
                  <line
                    x1={160+36}
                    y1={55 + yOffsets[idx]}
                    x2={270-34}
                    y2={130 + yOffsets[idx]}
                    className={`transition-all stroke-2 ${getFlowStyle(level, active && level!=="safe")}`}
                  />
                  {/* Clickable toggles at start */}
                  <circle
                    cx={50+28}
                    cy={130 + yOffsets[idx]}
                    r="12"
                    className={`fill-white stroke ${active ? "stroke-ethic-accent" : "stroke-gray-400"} cursor-pointer`}
                    onClick={() => handleToggle(dt.id)}
                  />
                  {active
                    ? <ToggleRight
                        x={50+22-13}
                        y={130 + yOffsets[idx] -13}
                        size={18}
                        className="text-ethic-accent cursor-pointer"
                        onClick={() => handleToggle(dt.id)}
                      />
                    : <ToggleLeft
                        x={50+22-13}
                        y={130 + yOffsets[idx] -13}
                        size={18}
                        className="text-gray-400 cursor-pointer"
                        onClick={() => handleToggle(dt.id)}
                      />}
                  {/* Endpoint: dots/hover for more info */}
                  <circle
                    cx={270-34}
                    cy={130 + yOffsets[idx]}
                    r="11"
                    className={`fill-white stroke ${level === "safe"
                      ? "stroke-green-500"
                      : level === "risky"
                        ? "stroke-red-500"
                        : "stroke-gray-400"
                    } cursor-pointer`}
                    onClick={() => handleSelect(dt.id)}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <circle
                        cx={160}
                        cy={55 + yOffsets[idx]}
                        r="9"
                        className="fill-blue-100 stroke-blue-400 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      Sent to App/Server<br />
                      ({dt.label})<br />
                      {dt.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </g>
              );
            })}
          </svg>
          {/* ARIA overlay for details */}
          {selectedId && (
            <div className="absolute top-3 left-3 right-3 z-40 bg-white/80 border-2 border-accent rounded-2xl shadow-xl p-4 flex flex-col gap-2 animate-fade-in ring-1 ring-ethic-accent ring-opacity-50"
              tabIndex={0} aria-live="polite">
              <div className="flex gap-2 items-center mb-2">
                {(() => {
                  const Icon = DATA_TYPES.find(dt=>dt.id===selectedId)?.icon;
                  return Icon ? <Icon size={22} className="text-ethic-accent" /> : null;
                })()}
                <span className="font-semibold text-sm">
                  {DATA_TYPES.find(dt=>dt.id===selectedId)?.label}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-auto"
                  aria-label="Close"
                  onClick={()=>setSelectedId(null)}
                >
                  ×
                </Button>
              </div>
              <div className="text-xs text-shadow-secondary">
                <div>
                  <span className="font-semibold">How We Use:</span>{" "}
                  {DATA_TYPES.find(dt=>dt.id===selectedId)?.details.usage}
                </div>
                <div>
                  <span className="font-semibold">Storage:</span>{" "}
                  {DATA_TYPES.find(dt=>dt.id===selectedId)?.details.storage}
                </div>
                <div>
                  <span className="font-semibold">Access:</span>{" "}
                  {DATA_TYPES.find(dt=>dt.id===selectedId)?.details.access}
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-fit mt-1"
                onClick={()=>setSelectedId(null)}
              >
                Close
              </Button>
            </div>
          )}
          {/* Alert if risky data is active */}
          {anyRiskyActive(dataState) && (
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center animate-fade-in z-30">
              <div className="bg-red-100 border border-red-400 text-red-600 py-1.5 px-3 rounded flex items-center gap-2 shadow">
                <AlertTriangle className="text-red-500" size={19} />
                <span className="font-semibold">ALERT:</span>
                <span>
                  Risky data flow detected! Data may be shared with unsafe zones.
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-shadow-secondary">
          <Info size={16} className="inline mr-1" />
          <span>
            Hover icons for info. Toggle switches or circles to turn sharing off/on. Click dots or data types for details.
          </span>
        </div>
      </div>
    </div>
  );
}
