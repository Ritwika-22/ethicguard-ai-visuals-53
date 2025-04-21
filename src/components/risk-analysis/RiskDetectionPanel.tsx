
import { useState } from "react";
import { Shield, Flag, Search, X, AlertTriangle, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface RiskIssue {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "mitigating" | "resolved";
  affectedData: string[];
  aiConfidence: number;
  detectedAt: string;
  resolutionSteps?: string[];
}

// Mock risk issues
const mockRiskIssues: RiskIssue[] = [
  {
    id: "RISK-001",
    name: "Unauthorized Third-Party Data Sharing",
    description: "Location data is being shared with advertising partners without explicit user consent",
    category: "Privacy",
    severity: "high",
    status: "open",
    affectedData: ["Location Data", "User ID"],
    aiConfidence: 92,
    detectedAt: "2025-04-18T15:30:00Z",
  },
  {
    id: "RISK-002",
    name: "Excessive Data Retention",
    description: "User browsing history is being retained beyond the stated policy period of 90 days",
    category: "Compliance",
    severity: "medium",
    status: "mitigating",
    affectedData: ["Browsing History", "User Preferences"],
    aiConfidence: 85,
    detectedAt: "2025-04-15T09:45:00Z",
    resolutionSteps: [
      "Update data retention policy enforcement",
      "Implement automatic data purging after 90 days",
      "Audit existing stored data"
    ]
  },
  {
    id: "RISK-003",
    name: "Demographic Bias in Recommendations",
    description: "AI recommendation system shows bias based on user age and location metrics",
    category: "Ethics",
    severity: "high",
    status: "open",
    affectedData: ["Age Data", "Location Data", "Recommendation Algorithm"],
    aiConfidence: 78,
    detectedAt: "2025-04-19T11:20:00Z",
  },
  {
    id: "RISK-004",
    name: "Incomplete Privacy Controls",
    description: "Users cannot easily opt out of behavioral analytics tracking",
    category: "Privacy",
    severity: "medium",
    status: "open",
    affectedData: ["Behavioral Data", "Device Information"],
    aiConfidence: 94,
    detectedAt: "2025-04-17T14:15:00Z",
  },
  {
    id: "RISK-005",
    name: "Insecure Data Transmission",
    description: "Some API endpoints are not using proper HTTPS encryption for data transmission",
    category: "Security",
    severity: "critical",
    status: "mitigating",
    affectedData: ["API Communications", "User Data Transfer"],
    aiConfidence: 98,
    detectedAt: "2025-04-20T08:30:00Z",
    resolutionSteps: [
      "Enforce HTTPS across all endpoints",
      "Implement proper SSL certificate validation",
      "Add transport layer security headers"
    ]
  },
  {
    id: "RISK-006",
    name: "Cookie Consent Non-Compliance",
    description: "Cookie consent mechanism does not meet GDPR requirements for explicit consent",
    category: "Compliance",
    severity: "high",
    status: "resolved",
    affectedData: ["Cookie Management", "User Preferences"],
    aiConfidence: 90,
    detectedAt: "2025-04-10T16:45:00Z",
    resolutionSteps: [
      "Updated consent UI to clearly explain cookie usage",
      "Implemented granular cookie opt-in controls",
      "Added audit trail for consent changes"
    ]
  },
  {
    id: "RISK-007",
    name: "PII Exposure in Logs",
    description: "Personally identifiable information found in application logs",
    category: "Security",
    severity: "high",
    status: "mitigating",
    affectedData: ["System Logs", "User Email", "IP Addresses"],
    aiConfidence: 87,
    detectedAt: "2025-04-16T10:20:00Z",
    resolutionSteps: [
      "Implement PII detection and redaction in logging system",
      "Review and clean existing logs"
    ]
  },
  {
    id: "RISK-008",
    name: "Missing Data Processing Records",
    description: "Documentation of data processing activities is incomplete for certain data categories",
    category: "Compliance",
    severity: "low",
    status: "open",
    affectedData: ["Data Processing Records", "Documentation"],
    aiConfidence: 75,
    detectedAt: "2025-04-18T09:10:00Z",
  }
];

const RiskDetectionPanel = () => {
  const { toast } = useToast();
  const [issues, setIssues] = useState<RiskIssue[]>(mockRiskIssues);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    severity: "all",
    category: "all"
  });
  const [scanning, setScanning] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<RiskIssue | null>(null);

  // Start risk detection scan
  const startScan = () => {
    setScanning(true);
    toast({
      title: "Risk detection scan started",
      description: "Scanning your system for potential risks..."
    });
    
    // Simulate scan completion
    setTimeout(() => {
      setScanning(false);
      toast({
        title: "Risk detection scan complete",
        description: "Found 2 new potential risks in your system."
      });
      // In a real app, you would update the issues list with new findings
    }, 3000);
  };

  // Filter issues based on search and filters
  const filteredIssues = issues.filter(issue => {
    // Search term filter
    if (
      searchTerm &&
      !issue.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !issue.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !issue.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Status filter
    if (filters.status !== "all" && issue.status !== filters.status) {
      return false;
    }
    
    // Severity filter
    if (filters.severity !== "all" && issue.severity !== filters.severity) {
      return false;
    }
    
    // Category filter
    if (filters.category !== "all" && issue.category !== filters.category) {
      return false;
    }
    
    return true;
  });

  // Helper to get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-50 text-red-700 border-red-200";
      case "mitigating":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "resolved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Helper to get severity badge style
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "high":
        return "bg-risk-highBg text-red-700 border-risk-highBorder";
      case "medium":
        return "bg-risk-mediumBg text-amber-700 border-risk-mediumBorder";
      case "low":
        return "bg-risk-lowBg text-green-700 border-risk-lowBorder";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Change issue status
  const updateIssueStatus = (id: string, newStatus: "open" | "mitigating" | "resolved") => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    
    toast({
      title: "Issue status updated",
      description: `Issue ${id} is now ${newStatus}`
    });
    
    // Close modal if open
    if (selectedIssue?.id === id) {
      setSelectedIssue({ ...selectedIssue, status: newStatus });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Flag className="mr-2 text-ethic-navy" size={20} />
            Risk Detection
          </h2>
          <p className="text-gray-500 text-sm">
            Identify and address potential ethical and privacy risks
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex">
          <Button 
            onClick={startScan} 
            disabled={scanning}
            className="bg-ethic-navy hover:bg-ethic-navy/90 text-white"
          >
            {scanning ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Scanning...
              </>
            ) : (
              <>
                <Search className="mr-2" size={16} />
                Run Detection Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="mitigating">Mitigating</option>
            <option value="resolved">Resolved</option>
          </select>
          
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.severity}
            onChange={(e) => setFilters({...filters, severity: e.target.value})}
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">All Categories</option>
            <option value="Privacy">Privacy</option>
            <option value="Ethics">Ethics</option>
            <option value="Security">Security</option>
            <option value="Compliance">Compliance</option>
          </select>
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <Card key={issue.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{issue.id}</Badge>
                    <Badge variant="outline" className={getSeverityBadge(issue.severity)}>
                      {issue.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadge(issue.status)}>
                      {issue.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="bg-gray-50">
                    {issue.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{issue.name}</CardTitle>
                <CardDescription className="mt-1">{issue.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {issue.affectedData.map((data, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {data}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <div className="flex items-center mr-4">
                    <AlertTriangle size={14} className="mr-1" />
                    <span>AI Confidence: {issue.aiConfidence}%</span>
                  </div>
                  <div>
                    Detected: {new Date(issue.detectedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-gray-50 py-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedIssue(issue)}
                >
                  View Details
                </Button>
                <div className="space-x-2">
                  {issue.status !== "resolved" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateIssueStatus(issue.id, "mitigating")}
                      disabled={issue.status === "mitigating"}
                    >
                      <Flag className="mr-1" size={14} />
                      {issue.status === "mitigating" ? "Mitigating" : "Start Mitigation"}
                    </Button>
                  )}
                  {issue.status !== "resolved" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      onClick={() => updateIssueStatus(issue.id, "resolved")}
                    >
                      <Check className="mr-1" size={14} />
                      Resolve
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <AlertTriangle className="mx-auto text-gray-400" size={32} />
            <p className="mt-2 text-gray-500">No risk issues match your search criteria</p>
          </div>
        )}
      </div>

      {/* Risk issue detail modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold mr-2">{selectedIssue.id}</h3>
                  <Badge variant="outline" className={getSeverityBadge(selectedIssue.severity)}>
                    {selectedIssue.severity.toUpperCase()}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedIssue(null)}
                >
                  <X size={18} />
                </Button>
              </div>

              <h2 className="text-2xl font-bold mt-2">{selectedIssue.name}</h2>
              <div className="flex items-center mt-3">
                <Badge variant="outline" className={getStatusBadge(selectedIssue.status)}>
                  {selectedIssue.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="ml-2 bg-gray-50">
                  {selectedIssue.category}
                </Badge>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{selectedIssue.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Affected Data</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedIssue.affectedData.map((data, index) => (
                      <li key={index} className="text-gray-700">{data}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">AI Confidence</h4>
                  <div className="flex items-center mb-2">
                    <span className={`font-bold text-lg ${
                      selectedIssue.aiConfidence > 90 ? "text-ethic-green" : 
                      selectedIssue.aiConfidence > 70 ? "text-amber-500" : 
                      "text-gray-500"
                    }`}>
                      {selectedIssue.aiConfidence}%
                    </span>
                  </div>
                  <Progress 
                    value={selectedIssue.aiConfidence} 
                    className="h-2" 
                    indicatorClassName="bg-ethic-green"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI confidence score in risk detection accuracy
                  </p>
                </div>
              </div>

              {selectedIssue.resolutionSteps && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Resolution Steps</h4>
                  <ul className="space-y-2">
                    {selectedIssue.resolutionSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={16} className="text-ethic-green mr-2 mt-1" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Mitigation Recommendations</h4>
                <div className="space-y-2 bg-ethic-lightgray p-4 rounded-lg">
                  {selectedIssue.category === "Privacy" && (
                    <div className="flex items-start">
                      <Lock size={16} className="text-ethic-navy mr-2 mt-1" />
                      <span>Implement explicit consent collection for this data category</span>
                    </div>
                  )}
                  {selectedIssue.category === "Ethics" && (
                    <div className="flex items-start">
                      <Shield size={16} className="text-ethic-navy mr-2 mt-1" />
                      <span>Review AI model for potential bias in {selectedIssue.affectedData.join(", ")}</span>
                    </div>
                  )}
                  {selectedIssue.category === "Compliance" && (
                    <div className="flex items-start">
                      <Check size={16} className="text-ethic-navy mr-2 mt-1" />
                      <span>Update data handling procedures to comply with relevant regulations</span>
                    </div>
                  )}
                  {selectedIssue.category === "Security" && (
                    <div className="flex items-start">
                      <Lock size={16} className="text-ethic-navy mr-2 mt-1" />
                      <span>Enhance encryption and access controls for sensitive data</span>
                    </div>
                  )}
                  <div className="flex items-start">
                    <AlertTriangle size={16} className="text-ethic-navy mr-2 mt-1" />
                    <span>Conduct regular audits to ensure ongoing compliance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-between">
              <div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedIssue(null)}
                >
                  Close
                </Button>
              </div>
              <div className="space-x-2">
                {selectedIssue.status !== "resolved" && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => updateIssueStatus(selectedIssue.id, "mitigating")}
                      disabled={selectedIssue.status === "mitigating"}
                    >
                      <Flag className="mr-1" size={14} />
                      {selectedIssue.status === "mitigating" ? "Mitigating" : "Start Mitigation"}
                    </Button>
                    <Button 
                      className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      onClick={() => updateIssueStatus(selectedIssue.id, "resolved")}
                    >
                      <Check className="mr-1" size={14} />
                      Mark as Resolved
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskDetectionPanel;
