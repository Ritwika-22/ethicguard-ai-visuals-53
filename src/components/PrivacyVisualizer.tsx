
import { useState } from "react";
import {
  Eye,
  Shield,
  Bell,
  AlertCircle,
  ArrowRight,
  Info,
  Lock,
  Unlock
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
    icon: Eye,
    safe: true,
    info: "Email stored securely",
    more: "Your email is encrypted and not shared externally.",
    collecting: true,
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: Lock,
    safe: false,
    info: "Contacts accessed",
    more: "Sharing contacts puts your friends' privacy at risk.",
    collecting: false,
  },
];

const PrivacyVisualizer = () => {
  const [points, setPoints] = useState(mockData);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Feedback state
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

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

  // For hover or click reveal
  const handleExpand = (id: string) => setExpanded(expanded === id ? null : id);

  // Privacy tips (random mock)
  const privacyTips = [
    "Turn off location sharing when not needed.",
    "Use strong unique passwords.",
    "Regularly review permissions and app settings.",
    "Be cautious of public Wi-Fi networks.",
  ];

  return (
    <div className="min-h-screen w-full bg-shadow-background text-shadow-foreground px-2 sm:px-6 py-8 flex flex-col items-center animate-fade-in">
      <div className="max-w-xl w-full mb-6 text-center">
        <h2 className="text-3xl font-bold mb-1 flex justify-center items-center gap-2">
          <Eye className="inline text-ethic-accent" size={28} />
          Privacy Visualizer
        </h2>
        <p className="text-shadow-secondary text-base mb-2">
          See how your data flows in real time. Tap a data type to learn more.
        </p>
      </div>

      {/* Animated data flow section */}
      <div className="w-full max-w-md mx-auto bg-shadow-card rounded-2xl shadow-md p-6 flex flex-col gap-6 mb-6 border border-shadow-border">
        <div className="flex flex-col gap-5">
          {points.map((point, idx) => (
            <div key={point.id} className="flex items-center gap-4">
              <span
                className={`flex items-center justify-center rounded-full text-white w-12 h-12 ${
                  point.safe
                    ? "bg-green-500"
                    : "bg-red-500"
                } transition-colors`}
                aria-label={point.safe ? "Safe Data" : "Risky Data"}
              >
                <point.icon size={24} aria-hidden />
              </span>
              <div className="flex-1 flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <span className="font-semibold text-lg">{point.label}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={18} className="ml-2 text-shadow-secondary cursor-pointer" tabIndex={0} aria-label="Quick info" />
                    </TooltipTrigger>
                    <TooltipContent>{point.info}</TooltipContent>
                  </Tooltip>
                </div>
                <Switch
                  checked={point.collecting}
                  aria-label={`Toggle data collection for ${point.label}`}
                  onCheckedChange={() => handleToggle(point.id)}
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                aria-label={expanded === point.id ? "Hide details" : "Show more"}
                onClick={() => handleExpand(point.id)}
              >
                <ArrowRight
                  size={20}
                  className={`transition-transform ${expanded === point.id ? "rotate-90 text-ethic-accent" : "text-shadow-secondary"}`}
                />
              </Button>
            </div>
          ))}
        </div>
        {/* Animate data flow (demo) */}
        <div className="mt-4 flex flex-col gap-2 items-center">
          <div className="flex gap-1 justify-center items-center">
            <span className="w-4 h-4 rounded-full bg-green-400 mr-1"></span>
            <ArrowRight className="text-green-400 animate-pulse-slow" size={18} />
            <span className="w-4 h-4 rounded-full bg-red-400 mx-1"></span>
            <ArrowRight className="text-red-400 animate-pulse-slow" size={18} />
            <span className="w-4 h-4 rounded-full bg-shadow-muted ml-1"></span>
          </div>
          <span className="text-xs text-shadow-secondary">Data flows to AI system and/or external partners</span>
        </div>
        {/* Alerts for risks */}
        {points.some(dp => !dp.safe && dp.collecting) && (
          <div className="bg-red-100 text-red-700 py-2 px-3 rounded flex items-center gap-2 mt-3 border border-red-400 animate-fade-in">
            <AlertCircle size={18} className="text-red-500" />
            <strong>Risk Alert:</strong>
            Some collected data might go to external or unsafe places!
          </div>
        )}
      </div>
      {/* Expanded panels for details */}
      {expanded && (
        <div className="w-full max-w-md mx-auto bg-shadow-muted rounded-xl shadow p-5 mb-4 animate-slide-down border border-shadow-border" tabIndex={0} aria-live="polite">
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`flex items-center justify-center rounded-full w-8 h-8 ${
                points.find(p => p.id === expanded)?.safe
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {points.find(p => p.id === expanded)?.safe ? <Shield size={18} /> : <AlertCircle size={18} />}
            </span>
            <span className="font-bold">{points.find(p => p.id === expanded)?.label}</span>
          </div>
          <p className="text-shadow-secondary">{points.find(p => p.id === expanded)?.more}</p>
          <Button
            size="sm"
            className="mt-3"
            variant="outline"
            onClick={() => setExpanded(null)}
            aria-label="Close details"
          >
            Close
          </Button>
        </div>
      )}

      {/* Privacy tips */}
      <div className="max-w-md w-full bg-shadow-card rounded-xl mt-6 mb-4 p-4 flex items-center gap-3">
        <Info size={22} className="text-ethic-accent" aria-hidden />
        <div className="text-sm font-medium text-shadow-secondary">{privacyTips[Math.floor(performance.now() % privacyTips.length)]}</div>
      </div>

      {/* Feedback */}
      <div className="max-w-md w-full flex flex-col items-center mb-2">
        {!showFeedback ? (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setShowFeedback(true)}
            aria-label="Give privacy feature feedback"
          >
            Share Feedback
          </Button>
        ) : (
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={e => {
              e.preventDefault();
              toast({ title: "Thank you for your feedback!" });
              setFeedback("");
              setShowFeedback(false);
            }}
          >
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              aria-label="Feedback"
              className="bg-shadow-muted rounded p-2 border border-shadow-border resize-none text-sm"
              rows={3}
              maxLength={280}
              placeholder="How can we improve this privacy visualizer?"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" size="sm">Submit</Button>
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                size="sm"
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PrivacyVisualizer;
