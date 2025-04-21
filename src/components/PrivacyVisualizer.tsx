
import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CircleAlert,
  ArrowRight,
  Info,
  Flag,
  FlagOff
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

// Types for demo data points
type DataPoint = {
  id: string;
  label: string;
  icon: React.ElementType;
  safe: boolean;
  info: string;
  more: string;
  collecting: boolean;
};

const mockData: DataPoint[] = [
  {
    id: "location",
    label: "Location",
    icon: Shield,
    safe: false,
    info: "Location info sent to server",
    more: "Sharing your live location may expose sensitive places you visit.",
    collecting: true,
  },
  {
    id: "email",
    label: "Email Address",
    icon: Flag,
    safe: true,
    info: "Email stored securely",
    more: "Your email is encrypted and not shared externally.",
    collecting: true,
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: AlertTriangle,
    safe: false,
    info: "Contacts accessed",
    more: "Sharing contacts puts your friends' privacy at risk.",
    collecting: false,
  }
];

const backgroundGradient =
  "bg-[linear-gradient(102.3deg,rgba(147,39,143,0.18)_5.9%,rgba(234,172,232,0.19)_64%,rgba(246,219,245,0.15)_89%)]";

function getRiskLevel(points: DataPoint[]) {
  const riskyCollected = points.filter(p => !p.safe && p.collecting).length;
  if (riskyCollected === 0) return { label: "Low", color: "bg-green-200 text-green-800", icon: <Shield size={18} /> };
  if (riskyCollected === 1) return { label: "Medium", color: "bg-yellow-200 text-yellow-900", icon: <Flag size={18} /> };
  return { label: "High", color: "bg-red-200 text-red-800", icon: <AlertTriangle size={18} /> };
}

const PrivacyVisualizer = () => {
  const [points, setPoints] = useState(mockData);
  const [expanded, setExpanded] = useState<string | null>(null);

  // For toggling data collection
  const handleToggle = (id: string) => {
    setPoints(points =>
      points.map(dp =>
        dp.id === id
          ? { ...dp, collecting: !dp.collecting }
          : dp
      )
    );
    const toggled = points.find(dp => dp.id === id);
    if (toggled) {
      toast({
        title: toggled.collecting
          ? `Data collection for "${toggled.label}" turned OFF`
          : `Data collection for "${toggled.label}" turned ON`,
        description: toggled.collecting
          ? "No longer collecting this data."
          : "Now collecting this data.",
      });
    }
  };

  // For expand details
  const handleExpand = (id: string) => setExpanded(expanded === id ? null : id);

  // Drag & drop demo handlers
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const onDragStart = (id: string) => setDraggedId(id);
  const onDropZone = (zone: "safe" | "blocked") => {
    if (!draggedId) return;
    setPoints(points =>
      points.map(dp =>
        dp.id === draggedId ? { ...dp, safe: zone === "safe" } : dp
      )
    );
    setDraggedId(null);
  };

  // Privacy summary
  const collected = points.filter(p => p.collecting);
  const risky = points.filter(p => p.collecting && !p.safe).length;
  const { label: riskLabel, color: riskColor, icon: riskIcon } = getRiskLevel(points);

  // Animated arrow color helpers
  const getFlowColor = (safe: boolean, collecting: boolean) => {
    if (!collecting) return "bg-gray-300";
    return safe ? "bg-green-400 animate-pulse-slow" : "bg-red-400 animate-pulse-slow";
  };

  // Privacy tips (more realistic, random pick)
  const privacyTips = [
    "Turn off location sharing when not needed.",
    "Review which apps have access to your contacts.",
    "Encrypt sensitive personal data at rest.",
    "Use strong, unique passwords and MFA.",
    "Be aware of regulatory requirements (GDPR, CCPA, etc).",
    "Regularly review permissions and privacy settings.",
    "Be cautious of public Wi-Fi networks."
  ];

  return (
    <div className={`min-h-screen w-full ${backgroundGradient} px-2 sm:px-6 py-10 flex flex-col items-center animate-fade-in`}>
      <div className="max-w-2xl w-full mb-8 text-center">
        <h2 className="text-4xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-400 to-green-500 flex justify-center items-center gap-2 drop-shadow">
          {/* lucide icon */}
          <CircleAlert className="inline text-red-400 animate-pulse mr-1" size={30} />
          Privacy Visualizer
        </h2>
        <div className="text-lg text-shadow-secondary mb-2 flex flex-col gap-1">
          <span>
            <b>Shows exactly how user data moves through your AI</b>
          </span>
          <span className="flex items-center gap-2 justify-center">
            <AlertTriangle className="text-red-500 w-5 h-5" />
            <span>🚨 Flags unsafe or non-compliant data usage</span>
          </span>
        </div>
        <div className="mt-2 text-sm text-purple-900 bg-white/60 rounded-lg py-2 px-3 inline-block shadow">
          <b>Tip:</b> Drag data chips to <span className="bg-green-100 text-green-700 mx-1 px-2 rounded">Safe</span> or <span className="bg-red-100 text-red-700 mx-1 px-2 rounded">Blocked</span> below.
        </div>
      </div>

      {/* Animated Cards/Flow */}
      <div className="w-full max-w-xl mx-auto rounded-2xl shadow-xl p-8 flex flex-col gap-8 mb-8 border border-shadow-border glass-morphism bg-white/70 relative">
        <div className="absolute -top-5 left-10 right-10 mx-auto flex justify-between z-10 pointer-events-none">
          <div className="w-32 h-4 bg-gradient-to-r from-green-100 via-transparent to-pink-200 rounded-full blur-sm"></div>
        </div>
        {/* Data Cards with drag */}
        <div className="flex flex-col gap-6">
          {points.map((point, idx) => (
            <div
              key={point.id}
              className={
                [
                  "flex items-center gap-4 p-3 sm:p-5 bg-white/95 rounded-xl border shadow-sm glass-morphism transition-all",
                  point.safe ? "border-green-300" : "border-red-300",
                  (!point.safe && point.collecting) ? "ring-2 ring-red-300 ring-offset-2 drop-shadow-lg" : "",
                  "relative group",
                  "cursor-grab active:scale-95 hover:shadow-lg"
                ].join(" ")
              }
              draggable
              aria-grabbed={draggedId === point.id}
              onDragStart={() => onDragStart(point.id)}
              onClick={() => handleExpand(point.id)}
              tabIndex={0}
              aria-label={`Show more about ${point.label}`}
            >
              <span className={`flex items-center justify-center rounded-full shadow w-11 h-11 border-2 ${point.safe ? "bg-gradient-to-br from-green-300 via-green-100 to-white border-green-400" : "bg-gradient-to-br from-red-300 via-pink-100 to-white border-red-400"} transition-all`}>
                <point.icon size={24} className={`${point.safe ? "text-green-600" : "text-red-600"}`} aria-hidden />
              </span>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-lg">{point.label}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={18} className="ml-1 text-shadow-secondary cursor-pointer hover:scale-110 hover:text-purple-700 transition" tabIndex={0} aria-label="Quick info" />
                    </TooltipTrigger>
                    <TooltipContent>{point.info}</TooltipContent>
                  </Tooltip>
                  {!point.safe && <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle size={13} className="inline" /> Risk</span>}
                  {point.safe && <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Shield size={12} className="inline" /> Safe</span>}
                </div>
                <div className="mt-1 text-sm text-gray-500 truncate">{point.collecting ? "Data collection enabled" : "Data collection paused"}</div>
              </div>
              <div className="flex items-center gap-2">
                {/* Switch */}
                <Switch
                  checked={point.collecting}
                  aria-label={`Toggle data collection for ${point.label}`}
                  onCheckedChange={e => {
                    e.stopPropagation?.();
                    handleToggle(point.id);
                  }}
                  className="data-toggle shadow"
                />
                {/* Animated colored arrow */}
                <ArrowRight
                  size={20}
                  className={[
                    getFlowColor(point.safe, point.collecting),
                    "rounded-full border border-gray-300 mx-1 shadow transition-transform duration-300",
                    point.collecting ? "scale-105 opacity-100" : "scale-90 opacity-60"
                  ].join(" ")}
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>

        {/* Animated data flow (from above chips) */}
        <div className="flex items-center gap-3 justify-center mt-2 relative">
          <div className="w-8 h-8 rounded-full border-2 border-green-400 bg-green-100 shadow-inner flex items-center justify-center">
            <Shield className="text-green-600" size={18} />
          </div>
          <ArrowRight className="text-green-400 animate-pulse-slow" size={22} />
          <div className="w-8 h-8 rounded-full border-2 border-red-400 bg-red-100 shadow-inner flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={18} />
          </div>
          <ArrowRight className="text-red-400 animate-pulse-slow" size={22} />
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 shadow-inner flex items-center justify-center">
            <FlagOff className="text-gray-500" size={18} />
          </div>
        </div>

        {/* Drop zones (drag sim) */}
        <div className="flex gap-6 mt-7 justify-between">
          <div
            className="flex-1 bg-green-100/60 rounded-xl border-2 border-green-300 text-green-700 py-2 px-2 text-center font-medium dropzone hover:bg-green-200/80 transition cursor-pointer"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              onDropZone("safe");
            }}
          >
            Drop Here: <span className="ml-1 font-bold text-green-700">Safe</span>
          </div>
          <div
            className="flex-1 bg-red-100/60 rounded-xl border-2 border-red-300 text-red-700 py-2 px-2 text-center font-medium dropzone hover:bg-red-200/80 transition cursor-pointer"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              onDropZone("blocked");
            }}
          >
            Drop Here: <span className="ml-1 font-bold text-red-700">Blocked</span>
          </div>
        </div>
        {/* Alerts for risks */}
        {points.some(dp => !dp.safe && dp.collecting) && (
          <div className="bg-red-50 text-red-700 mt-5 py-2 px-4 rounded-xl flex items-center gap-2 border border-red-300 drop-shadow animate-fade-in">
            <CircleAlert size={20} className="text-red-400 ml-1" />
            <strong>Risk Alert:</strong>
            Data marked as risky and being collected! Review your sharing options.
          </div>
        )}
      </div>

      {/* Expanded panels for details */}
      {expanded && (
        <div className="w-full max-w-xl mx-auto bg-white/95 rounded-xl shadow-xl p-6 mb-6 border border-shadow-border glass-morphism animate-slide-down" tabIndex={0} aria-live="polite">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`flex items-center justify-center rounded-full w-8 h-8 border-2 ${points.find(p => p.id === expanded)?.safe ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"}`}
            >
              {points.find(p => p.id === expanded)?.safe ? <Shield size={18} /> : <AlertTriangle size={18} />}
            </span>
            <span className="font-bold text-lg">{points.find(p => p.id === expanded)?.label}</span>
          </div>
          <div className="text-shadow-secondary mb-2">{points.find(p => p.id === expanded)?.more}</div>
          <Button
            size="sm"
            className="mt-2"
            variant="outline"
            onClick={() => setExpanded(null)}
            aria-label="Close details"
          >
            Close
          </Button>
        </div>
      )}

      {/* Privacy tips */}
      <div className="max-w-xl w-full bg-gradient-to-r from-purple-100 via-pink-100 to-green-100 rounded-xl mt-2 mb-4 px-6 py-3 flex items-center gap-3 border border-purple-200 glass-morphism shadow">
        <Info size={22} className="text-purple-400" aria-hidden />
        <div className="text-base font-medium text-purple-900">{privacyTips[Math.floor(performance.now() % privacyTips.length)]}</div>
      </div>

      {/* Privacy summary/footer bar */}
      <div className="mt-2 w-full max-w-xl rounded-xl shadow bg-white/90 glass-morphism border border-gray-200 flex items-center justify-between px-6 py-3 text-lg font-medium">
        <div>
          <span className="mr-2 font-bold text-gray-800">Shared data types:</span>
          <span className="">{collected.length} / {points.length}</span>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 text-base ${riskColor}`}>
            {riskIcon}
            Risk: {riskLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrivacyVisualizer;

