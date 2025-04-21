
import { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Info,
  ShieldCheck,
  ListChecks,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Demo data for risk table
const initialData = [
  {
    id: 1,
    label: "Email Address",
    type: "Personal",
    risk: 0, // 0: Low, 1: Medium, 2: High
    riskInfo: {
      tips: "Consider hashing addresses and limit sharing with 3rd parties.",
      impact: "If leaked, users may receive spam or phishing.",
    },
  },
  {
    id: 2,
    label: "Location",
    type: "Sensitive",
    risk: 1,
    riskInfo: {
      tips: "Request location only when necessary.",
      impact: "May reveal home or work locations, risking privacy.",
    },
  },
  {
    id: 3,
    label: "Browsing History",
    type: "Behavioral",
    risk: 2,
    riskInfo: {
      tips: "Regularly clear logs and use secure transfer.",
      impact: "Can be exploited for profiling or targeted ads.",
    },
  },
];

const RISK_LABELS = [
  { text: "Low", color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />, highlight: "border-green-400" },
  { text: "Medium", color: "bg-yellow-100 text-yellow-700", icon: <AlertCircle className="w-4 h-4 inline mr-1 text-yellow-500" />, highlight: "border-yellow-400" },
  { text: "High", color: "bg-red-100 text-red-700", icon: <AlertCircle className="w-4 h-4 inline mr-1 text-red-600" />, highlight: "border-red-400" },
];

// Dummy live logs for demonstration
const initialLogs = [
  { type: "info", msg: "System initialized. Monitoring data flows..." },
  { type: "success", msg: "All data connections are encrypted." },
  { type: "warn", msg: "Location data requested by map-service.js" },
  { type: "alert", msg: "Browsing History risk detected! Data shared with AdNetwork." },
];

function getLogColor(type: string) {
  switch (type) {
    case "success": return "text-green-600";
    case "warn": return "text-yellow-600";
    case "alert": return "text-red-600";
    default: return "text-gray-500";
  }
}

export default function RiskMonitorPanel() {
  const [data, setData] = useState(initialData);
  const [logs, setLogs] = useState(initialLogs);

  // Demo: periodically add a "live" log entry
  useEffect(() => {
    const interval = setInterval(() => {
      const simulated = [
        { type: "info", msg: "No unusual activity detected." },
        { type: "alert", msg: "Potential risk: third-party request flagged." },
        { type: "warn", msg: "Unusual login detected from new device." },
        { type: "success", msg: "Audit logs archived and compliant." },
      ];
      setLogs((logList) => [
        ...logList.slice(-7),
        simulated[Math.floor(Math.random()*simulated.length)],
      ]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Change risk level interactively (cycles through Low > Med > High)
  function handleRiskClick(idx: number) {
    setData((d) =>
      d.map((row, ri) =>
        ri === idx
          ? { ...row, risk: (row.risk + 1) % 3 }
          : row
      )
    );
    setLogs((logList) => [
      ...logList.slice(-7),
      { type: "info", msg: `Risk level for "${data[idx].label}" updated.` },
    ]);
  }

  return (
    <TooltipProvider>
      <div className="space-y-10">
        {/* Interactive Risk Table */}
        <div>
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <CheckCircle className="mr-2 text-ethic-green" size={20} />
            Show Data Risk
          </h3>
          <div className="overflow-x-auto bg-white rounded-lg border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-2 text-left">Data Item</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Risk Level</th>
                  <th className="px-4 py-2 text-left">More Info</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{row.label}</td>
                    <td className="px-4 py-2">{row.type}</td>
                    <td className="px-4 py-2">
                      <Button
                        variant="outline"
                        className={`px-2 py-1 rounded-full border ${RISK_LABELS[row.risk].highlight} ${RISK_LABELS[row.risk].color} font-medium text-xs transition`}
                        onClick={() => handleRiskClick(idx)}
                        title="Click to change risk level"
                      >
                        {RISK_LABELS[row.risk].icon}
                        {RISK_LABELS[row.risk].text}
                        <span className="ml-1 text-xs">(edit)</span>
                      </Button>
                    </td>
                    <td className="px-4 py-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="text-gray-400 hover:text-blue-500 hover:scale-110 transition cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="mb-2">
                            <span className="font-semibold">Tips:</span> {row.riskInfo.tips}
                          </div>
                          <div>
                            <span className="font-semibold">Potential Impact:</span> {row.riskInfo.impact}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs mt-2 text-gray-500">
            <Info className="inline mr-1" size={14} />
            <span>
              Click a risk tag to change its level. Hover <Info className="inline -mt-0.5" size={14} /> for advice.
            </span>
          </div>
        </div>
        {/* Problems, Impact, Fixes, Other */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <AlertCircle className="mt-0.5 text-red-600" size={22} />
            <div>
              <div className="font-semibold">Spot Problems</div>
              <div className="text-muted-foreground text-sm">
                Alert users if data might go to unsafe places or get misused.
              </div>
            </div>
          </div>
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <Zap className="mt-0.5 text-blue-600" size={22} />
            <div>
              <div className="font-semibold">Live Tracking</div>
              <div className="text-muted-foreground text-sm">
                Watch data flow in real-time and warn if something looks wrong.
              </div>
              <div className="mt-3 bg-gray-100 rounded px-3 py-2 max-h-24 overflow-y-auto text-xs border border-gray-200 font-mono shadow-inner" style={{ fontSize: "0.85em" }}>
                {logs.slice(-6).map((log, i) => (
                  <div key={i} className={getLogColor(log.type)}>
                    {log.msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <Info className="mt-0.5 text-gray-600" size={22} />
            <div>
              <div className="font-semibold">Explain Impact</div>
              <div className="text-muted-foreground text-sm">
                Tell users what could happen if there’s a data risk.
              </div>
            </div>
          </div>
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <ShieldCheck className="mt-0.5 text-ethic-green" size={22} />
            <div>
              <div className="font-semibold">Fix Suggestions</div>
              <div className="text-muted-foreground text-sm">
                Give tips like “Turn off this data” or “Use strong password.”
              </div>
            </div>
          </div>
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <ListChecks className="mt-0.5 text-purple-600" size={22} />
            <div>
              <div className="font-semibold">Stay Legal</div>
              <div className="text-muted-foreground text-sm">
                Follow privacy rules (like GDPR) and keep logs.
              </div>
            </div>
          </div>
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <Clock className="mt-0.5 text-yellow-600" size={22} />
            <div>
              <div className="font-semibold">Easy to Understand</div>
              <div className="text-muted-foreground text-sm">
                Use icons, colors, and simple words.
              </div>
            </div>
          </div>
          <div className="p-4 border bg-card rounded-lg flex items-start gap-3">
            <Zap className="mt-0.5 text-indigo-600" size={22} />
            <div>
              <div className="font-semibold">Keep Improving</div>
              <div className="text-muted-foreground text-sm">
                Update the system as new risks come up.
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
