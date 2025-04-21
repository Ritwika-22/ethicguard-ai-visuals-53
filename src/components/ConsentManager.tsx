
import { useState } from "react";
import {
  Check,
  X,
  Info,
  FileText,
  FileMinus,
  ExternalLink,
  CalendarCheck,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Type for consent data
interface ConsentOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  required: boolean;
  category: "essential" | "functional" | "analytics" | "marketing" | "third-party";
  dataCollected: string[];
  impact: string;
  lastUpdated: string;
  thirdParties?: string[];
}

// Consent history entry type
interface ConsentHistoryEntry {
  date: string;
  action: string;
  settings: {
    [key: string]: boolean;
  };
}

const ConsentManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("settings");
  
  // Initial consent options
  const [consentOptions, setConsentOptions] = useState<ConsentOption[]>([
    {
      id: "essential",
      name: "Essential Functions",
      description: "Required for the application to function properly",
      enabled: true,
      required: true,
      category: "essential",
      dataCollected: ["User session", "Authentication data", "Basic preferences"],
      impact: "Without these, the application cannot function properly",
      lastUpdated: "2025-01-15",
    },
    {
      id: "usage-analytics",
      name: "Usage Analytics",
      description: "Collect information about how you use our platform",
      enabled: false,
      required: false,
      category: "analytics",
      dataCollected: ["Pages visited", "Features used", "Time spent", "Device info"],
      impact: "Helps us improve user experience and identify issues",
      lastUpdated: "2025-02-20",
    },
    {
      id: "personalization",
      name: "Personalization",
      description: "Customize your experience based on your behavior",
      enabled: false,
      required: false,
      category: "functional",
      dataCollected: ["Preferences", "Past interactions", "Workflow patterns"],
      impact: "Provides personalized recommendations and UI adjustments",
      lastUpdated: "2025-03-01",
    },
    {
      id: "tracking-cookies",
      name: "Tracking Cookies",
      description: "Use cookies to track your browsing behavior",
      enabled: false,
      required: false,
      category: "marketing",
      dataCollected: ["Browser information", "IP address", "Click patterns"],
      impact: "Enables targeted content delivery",
      lastUpdated: "2025-03-05",
    },
    {
      id: "data-sharing",
      name: "Data Sharing",
      description: "Share anonymized data with research partners",
      enabled: false,
      required: false,
      category: "third-party",
      dataCollected: ["Anonymized usage patterns", "Feature preferences"],
      impact: "Contributes to AI ethics research and improvement",
      lastUpdated: "2025-03-10",
      thirdParties: [
        "AI Ethics Institute",
        "University Research Programs",
        "Industry Partners"
      ],
    },
    {
      id: "feedback-collection",
      name: "Feedback Collection",
      description: "Store your feedback to improve our services",
      enabled: false,
      required: false,
      category: "functional",
      dataCollected: ["Feedback text", "Satisfaction ratings", "Feature requests"],
      impact: "Helps us understand user needs and improve the platform",
      lastUpdated: "2025-03-15",
    },
  ]);

  // Consent history
  const [consentHistory, setConsentHistory] = useState<ConsentHistoryEntry[]>([
    {
      date: "2025-03-15 14:30:22",
      action: "Initial consent settings applied",
      settings: {
        essential: true,
        "usage-analytics": false,
        personalization: false,
        "tracking-cookies": false,
        "data-sharing": false,
        "feedback-collection": false,
      },
    },
  ]);

  // Function to update a single consent option
  const updateConsent = (id: string, enabled: boolean) => {
    const newOptions = consentOptions.map((option) =>
      option.id === id
        ? { ...option, enabled: option.required ? true : enabled }
        : option
    );
    
    setConsentOptions(newOptions);
    
    // Update consent history
    const newHistoryEntry: ConsentHistoryEntry = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: `Updated consent for ${id} to ${enabled ? "enabled" : "disabled"}`,
      settings: Object.fromEntries(
        newOptions.map((option) => [option.id, option.enabled])
      ),
    };
    
    setConsentHistory([newHistoryEntry, ...consentHistory]);
    
    // Show toast notification
    toast({
      title: "Consent Updated",
      description: `Your ${id.replace(/-/g, " ")} settings have been updated.`,
    });
  };

  // Accept all consents
  const acceptAll = () => {
    const newOptions = consentOptions.map((option) => ({
      ...option,
      enabled: true,
    }));
    
    setConsentOptions(newOptions);
    
    // Update consent history
    const newHistoryEntry: ConsentHistoryEntry = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: "Accepted all consent options",
      settings: Object.fromEntries(
        newOptions.map((option) => [option.id, option.enabled])
      ),
    };
    
    setConsentHistory([newHistoryEntry, ...consentHistory]);
    
    toast({
      title: "All Consents Accepted",
      description: "You've enabled all consent options.",
    });
  };

  // Reject all non-essential consents
  const rejectAll = () => {
    const newOptions = consentOptions.map((option) => ({
      ...option,
      enabled: option.required,
    }));
    
    setConsentOptions(newOptions);
    
    // Update consent history
    const newHistoryEntry: ConsentHistoryEntry = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: "Rejected all non-essential consent options",
      settings: Object.fromEntries(
        newOptions.map((option) => [option.id, option.enabled])
      ),
    };
    
    setConsentHistory([newHistoryEntry, ...consentHistory]);
    
    toast({
      title: "Only Essential Consents Kept",
      description: "You've disabled all optional consent options.",
    });
  };

  // Simulate data export
  const exportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export has been started. You'll receive a download link shortly.",
    });
  };

  // Simulate data deletion
  const deleteData = () => {
    toast({
      title: "Data Deletion Requested",
      description: "Your data deletion request has been received. This process may take up to 30 days.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Consent Manager</h2>
          <p className="text-muted-foreground">
            Control how your data is collected, used, and shared
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={rejectAll}
            className="bg-white border-gray-300"
          >
            <X className="w-4 h-4 mr-2" />
            Reject All
          </Button>
          <Button 
            onClick={acceptAll}
            className="bg-ethic-green hover:bg-ethic-green/90 text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="settings">Consent Settings</TabsTrigger>
          <TabsTrigger value="data">Your Data</TabsTrigger>
          <TabsTrigger value="history">Consent History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection & Usage</CardTitle>
              <CardDescription>
                Manage how we collect and use your data to provide our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {consentOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border ${
                    option.enabled
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="font-medium mr-2">{option.name}</h3>
                      {option.required && (
                        <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                          Required
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {option.enabled ? (
                        <ToggleRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                      )}
                      <Switch
                        checked={option.enabled}
                        onCheckedChange={(checked) => updateConsent(option.id, checked)}
                        disabled={option.required}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="py-1 text-sm text-blue-600 hover:text-blue-800 no-underline hover:no-underline">
                        Show details
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-1 text-sm space-y-3">
                          <div>
                            <p className="font-medium text-gray-700">Data Collected:</p>
                            <ul className="list-disc list-inside pl-2 text-gray-600">
                              {option.dataCollected.map((data, index) => (
                                <li key={index}>{data}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {option.thirdParties && (
                            <div>
                              <p className="font-medium text-gray-700">Shared With:</p>
                              <ul className="list-disc list-inside pl-2 text-gray-600">
                                {option.thirdParties.map((party, index) => (
                                  <li key={index}>{party}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div>
                            <p className="font-medium text-gray-700">Impact if Disabled:</p>
                            <p className="text-gray-600">{option.impact}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Last Updated:</p>
                            <p className="text-gray-600">{option.lastUpdated}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-gray-500 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Your privacy choices are stored in your browser
              </div>
              <Button variant="outline" onClick={acceptAll} size="sm">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cookie Policy</CardTitle>
              <CardDescription>
                Manage cookies stored on your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                We use cookies to remember your preferences and provide essential
                functionality. Some cookies are necessary for our platform to work
                properly, while others help us improve your experience.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Cookie Policy
                </Button>
                <Button variant="outline" size="sm" className="flex gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Data Rights</CardTitle>
              <CardDescription>
                Access, export, or delete your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <h3 className="font-medium flex items-center text-blue-800 mb-2">
                  <FileText className="h-5 w-5 mr-2" />
                  Export Your Data
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download a complete copy of all your personal data that we store.
                  The export includes your profile information, preferences, and
                  interaction history.
                </p>
                <Button 
                  onClick={exportData}
                  variant="outline"
                  size="sm"
                  className="text-blue-700 hover:text-blue-800 bg-white"
                >
                  Request Data Export
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                <h3 className="font-medium flex items-center text-red-800 mb-2">
                  <FileMinus className="h-5 w-5 mr-2" />
                  Delete Your Data
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Request the deletion of all your personal data from our systems.
                  This process may take up to 30 days to complete across all our
                  systems and backups.
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={deleteData}
                        variant="outline"
                        size="sm"
                        className="text-red-700 hover:text-red-800 bg-white"
                      >
                        Request Data Deletion
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This action cannot be undone</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="px-4 py-3 border rounded-lg bg-yellow-50 border-yellow-200">
                <h3 className="font-medium flex items-center text-yellow-800">
                  <Info className="h-5 w-5 mr-2" />
                  How We Process Your Data
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    • All data is processed in accordance with GDPR and other applicable privacy laws
                  </p>
                  <p className="text-sm text-gray-600">
                    • We use industry-standard security measures to protect your data
                  </p>
                  <p className="text-sm text-gray-600">
                    • Data is only retained for as long as necessary for the stated purposes
                  </p>
                  <p className="text-sm text-gray-600">
                    • We conduct regular privacy impact assessments on our data processing activities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent Audit Trail</CardTitle>
              <CardDescription>
                View the history of changes to your consent settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consentHistory.map((entry, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <CalendarCheck className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{entry.action}</p>
                        <p className="text-xs text-gray-500">{entry.date}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {Object.entries(entry.settings).map(([key, value]) => (
                            <div 
                              key={key}
                              className={`px-3 py-1.5 rounded-md text-xs ${
                                value
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : "bg-gray-50 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {key.replace(/-/g, " ")}: {value ? "Enabled" : "Disabled"}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsentManager;
