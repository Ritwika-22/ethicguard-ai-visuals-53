
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Eye, ShieldCheck, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FeatureExampleDialogProps {
  featureId: string;
  children: React.ReactNode;
}

/**
 * FeatureExampleDialog renders a dialog/modal showing a practical example
 * of the selected EthicGuard feature.
 */
const featureExamples: Record<string, { icon: React.ElementType; title: string; desc: string; example: React.ReactNode }> = {
  "shadow-mode": {
    icon: Eye,
    title: "Shadow Mode Example",
    desc: "Preview how Shadow Mode tests AI decisions before going live.",
    example: (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye className="text-blue-500" size={20}/> Shadow Mode Test</CardTitle>
          <CardDescription>AI vs. Human output comparison on a content moderation task:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <span className="block font-medium">Input:</span>
            <span className="text-gray-700">"This product sucks and anyone who buys it is an idiot."</span>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <div className="font-semibold text-gray-700 mb-1">Human Decision</div>
              <div className="bg-gray-100 p-2 rounded">Flagged for review as disrespectful.</div>
            </div>
            <div className="w-1/2">
              <div className="font-semibold text-gray-700 mb-1">AI Decision</div>
              <div className="bg-gray-100 p-2 rounded">Flagged for hate speech: 92% confidence.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-red-600">
            <AlertTriangle size={17}/> High risk: harmful language detected.
          </div>
        </CardContent>
      </Card>
    )
  },
  "privacy-visualizer": {
    icon: ShieldCheck,
    title: "Privacy Visualizer Example",
    desc: "See how Privacy Visualizer reveals sensitive data flows.",
    example: (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-emerald-500" size={20}/> Data Flow Map</CardTitle>
          <CardDescription>
            PII movement tracing:<br/>
            <span className="text-gray-700">User email <b>→</b> AI Model <b>→</b> 3rd Party Service</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-emerald-50 rounded p-3 mb-2">
            <span className="font-medium">Potential Issue:</span> User email is sent to a 3rd party without anonymization.
          </div>
          <ul className="text-sm pl-4 list-disc mb-2">
            <li>Flags personal data leaving organization without explicit consent.</li>
            <li>Suggests data minimization to comply with GDPR.</li>
          </ul>
          <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs">Compliance Tip: Mask PII before external transfer.</span>
        </CardContent>
      </Card>
    )
  },
  "consent-layer": {
    icon: Check,
    title: "Consent Layer Example",
    desc: "Experience how users control their data in the Consent Layer.",
    example: (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Check className="text-amber-500" size={20}/> Consent Flow</CardTitle>
          <CardDescription>
            A popup requests specific data permissions:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="pl-4 list-disc text-sm space-y-1">
            <li>
              <span className="font-medium">Analytics &amp; Performance</span> <span className="text-muted-foreground">(opt-in)</span>
            </li>
            <li>
              <span className="font-medium">Data Storage</span> <span className="text-muted-foreground">(opt-out supported)</span>
            </li>
            <li>
              <span className="font-medium">Third-Party Sharing</span> <span className="text-muted-foreground">(requires explicit consent)</span>
            </li>
          </ul>
          <div className="mt-4">
            <Button variant="default" className="bg-ethic-navy text-white">Save Preferences</Button>
          </div>
          <div className="text-xs mt-3 text-gray-600">Consent changes are logged for compliance evidence.</div>
        </CardContent>
      </Card>
    )
  },
  "risk-alerts": {
    icon: AlertTriangle,
    title: "Real-Time Risk Alerts Example",
    desc: "Get notified when ethical risks are detected.",
    example: (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-rose-500" size={20}/> Risk Alert</CardTitle>
          <CardDescription>
            Immediate risk alert for detected discrimination:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-rose-50 rounded mb-2 text-rose-700 flex items-center gap-2">
            <AlertTriangle size={17}/> <span>Bias detected in hiring recommendations! (Gender disparity)</span>
          </div>
          <div className="mb-2 text-sm">
            <span className="font-medium">Action Required:</span> Review and adjust AI model parameters.
          </div>
          <div className="text-xs text-gray-600">All alerts are tracked for resolution workflow.</div>
        </CardContent>
      </Card>
    )
  },
};

export default function FeatureExampleDialog({ featureId, children }: FeatureExampleDialogProps) {
  const item = featureExamples[featureId];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.desc}</DialogDescription>
        </DialogHeader>
        <div className="mt-2">{item.example}</div>
      </DialogContent>
    </Dialog>
  );
}
