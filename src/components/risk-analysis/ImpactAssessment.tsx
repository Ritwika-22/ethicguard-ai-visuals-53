
import { useState } from "react";
import { 
  AlertTriangle, 
  Users, 
  Building, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Info,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface ImpactAssessment {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  lastUpdated: string;
  status: "draft" | "in_progress" | "completed" | "approved";
  riskLevel: "low" | "medium" | "high";
  userImpact: number;
  businessImpact: number;
  complianceImpact: number;
  mitigationScore: number;
  assessmentAreas: {
    name: string;
    completed: boolean;
    issues: number;
  }[];
  keyFindings: string[];
}

// Mock data
const mockAssessments: ImpactAssessment[] = [
  {
    id: "IA-2025-001",
    name: "User Location Data Processing Assessment",
    description: "Impact assessment for the collection and processing of user location data for the recommendation engine",
    dateCreated: "2025-03-15",
    lastUpdated: "2025-04-10",
    status: "completed",
    riskLevel: "high",
    userImpact: 85,
    businessImpact: 60,
    complianceImpact: 90,
    mitigationScore: 70,
    assessmentAreas: [
      { name: "Data Collection Practices", completed: true, issues: 3 },
      { name: "User Consent", completed: true, issues: 2 },
      { name: "Data Security", completed: true, issues: 1 },
      { name: "Third-Party Sharing", completed: true, issues: 4 },
      { name: "Retention Policies", completed: true, issues: 2 },
    ],
    keyFindings: [
      "Location data is collected more frequently than necessary for stated purposes",
      "Insufficient granularity in user consent options for location data",
      "Third-party data sharing lacks adequate contractual safeguards",
      "Potential GDPR compliance issues with retention periods"
    ]
  },
  {
    id: "IA-2025-002",
    name: "Customer Sentiment Analysis Impact",
    description: "Assessment of AI-powered sentiment analysis on customer service interactions",
    dateCreated: "2025-04-01",
    lastUpdated: "2025-04-18",
    status: "in_progress",
    riskLevel: "medium",
    userImpact: 60,
    businessImpact: 75,
    complianceImpact: 50,
    mitigationScore: 65,
    assessmentAreas: [
      { name: "Data Collection Practices", completed: true, issues: 1 },
      { name: "User Consent", completed: true, issues: 0 },
      { name: "Data Security", completed: true, issues: 0 },
      { name: "Algorithm Fairness", completed: false, issues: 0 },
      { name: "Transparency", completed: false, issues: 0 },
    ],
    keyFindings: [
      "Sentiment analysis may have cultural bias in language interpretation",
      "Customer service actions based on sentiment scores could create feedback loops"
    ]
  },
  {
    id: "IA-2025-003",
    name: "Biometric Authentication System",
    description: "Analysis of privacy and ethical implications of new biometric login system",
    dateCreated: "2025-03-30",
    lastUpdated: "2025-04-15",
    status: "draft",
    riskLevel: "high",
    userImpact: 90,
    businessImpact: 65,
    complianceImpact: 95,
    mitigationScore: 40,
    assessmentAreas: [
      { name: "Data Collection Practices", completed: true, issues: 2 },
      { name: "User Consent", completed: false, issues: 0 },
      { name: "Data Security", completed: true, issues: 3 },
      { name: "Accessibility", completed: false, issues: 0 },
      { name: "Compliance", completed: false, issues: 0 },
    ],
    keyFindings: [
      "Biometric data storage may create significant security risks",
      "Alternative authentication methods needed for accessibility",
      "Cross-border data transfer concerns for international users"
    ]
  },
  {
    id: "IA-2025-004",
    name: "Recommendation Algorithm Update",
    description: "Assessment of changes to content recommendation algorithm",
    dateCreated: "2025-04-05",
    lastUpdated: "2025-04-19",
    status: "completed",
    riskLevel: "low",
    userImpact: 45,
    businessImpact: 70,
    complianceImpact: 30,
    mitigationScore: 85,
    assessmentAreas: [
      { name: "Algorithm Fairness", completed: true, issues: 1 },
      { name: "User Control", completed: true, issues: 0 },
      { name: "Content Diversity", completed: true, issues: 2 },
      { name: "Transparency", completed: true, issues: 0 },
    ],
    keyFindings: [
      "Algorithm may create filter bubbles reducing content diversity",
      "Provides appropriate user controls to adjust recommendations"
    ]
  },
];

const ImpactAssessment = () => {
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<ImpactAssessment[]>(mockAssessments);
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  // Toggle assessment expansion
  const toggleAssessment = (id: string) => {
    setExpandedAssessment(expandedAssessment === id ? null : id);
  };

  // Filter assessments
  const filteredAssessments = assessments.filter(assessment => {
    // Search filter
    if (
      searchTerm && 
      !assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !assessment.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== "all" && assessment.status !== statusFilter) {
      return false;
    }
    
    // Risk filter
    if (riskFilter !== "all" && assessment.riskLevel !== riskFilter) {
      return false;
    }
    
    return true;
  });

  // Start new assessment
  const startNewAssessment = () => {
    toast({
      title: "New Assessment Started",
      description: "A new impact assessment template has been created."
    });
  };

  // Helper functions for styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "approved":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-risk-lowBg text-green-700 border-risk-lowBorder";
      case "medium":
        return "bg-risk-mediumBg text-amber-700 border-risk-mediumBorder";
      case "high":
        return "bg-risk-highBg text-red-700 border-risk-highBorder";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getImpactLevel = (score: number) => {
    if (score < 40) return "Low";
    if (score < 70) return "Medium";
    return "High";
  };

  const getImpactColor = (score: number) => {
    if (score < 40) return "text-green-600";
    if (score < 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <AlertTriangle className="mr-2 text-ethic-navy" size={20} />
            Data Impact Assessments
          </h2>
          <p className="text-gray-500 text-sm">
            Evaluate the privacy and ethical impact of your AI systems
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={startNewAssessment}
            className="bg-ethic-navy hover:bg-ethic-navy/90 text-white"
          >
            New Assessment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
          </select>
          
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((assessment) => (
            <div
              key={assessment.id}
              className="border rounded-lg overflow-hidden"
            >
              {/* Assessment header */}
              <div
                className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleAssessment(assessment.id)}
              >
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center mb-2">
                    <h3 className="font-medium md:mr-2">{assessment.name}</h3>
                    <div className="flex space-x-2 mt-1 md:mt-0">
                      <Badge variant="outline" className={getStatusBadge(assessment.status)}>
                        {assessment.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getRiskBadge(assessment.riskLevel)}>
                        {assessment.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{assessment.description}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    ID: {assessment.id} | Created: {assessment.dateCreated} | Last Updated: {assessment.lastUpdated}
                  </div>
                </div>
                <div className="md:ml-4 mt-2 md:mt-0">
                  {expandedAssessment === assessment.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded assessment details */}
              {expandedAssessment === assessment.id && (
                <div className="border-t p-4 animate-slide-down">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Impact scores */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700 flex items-center">
                        <Users size={16} className="mr-2" />
                        Impact Analysis
                      </h4>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">User Impact</span>
                          <span className={`text-sm font-medium ${getImpactColor(assessment.userImpact)}`}>
                            {getImpactLevel(assessment.userImpact)}
                          </span>
                        </div>
                        <Progress 
                          value={assessment.userImpact} 
                          className="h-2" 
                          indicatorClassName={
                            assessment.userImpact < 40 ? "bg-risk-low" :
                            assessment.userImpact < 70 ? "bg-risk-medium" :
                            "bg-risk-high"
                          }
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Business Impact</span>
                          <span className={`text-sm font-medium ${getImpactColor(assessment.businessImpact)}`}>
                            {getImpactLevel(assessment.businessImpact)}
                          </span>
                        </div>
                        <Progress 
                          value={assessment.businessImpact} 
                          className="h-2" 
                          indicatorClassName={
                            assessment.businessImpact < 40 ? "bg-risk-low" :
                            assessment.businessImpact < 70 ? "bg-risk-medium" :
                            "bg-risk-high"
                          }
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Compliance Impact</span>
                          <span className={`text-sm font-medium ${getImpactColor(assessment.complianceImpact)}`}>
                            {getImpactLevel(assessment.complianceImpact)}
                          </span>
                        </div>
                        <Progress 
                          value={assessment.complianceImpact} 
                          className="h-2" 
                          indicatorClassName={
                            assessment.complianceImpact < 40 ? "bg-risk-low" :
                            assessment.complianceImpact < 70 ? "bg-risk-medium" :
                            "bg-risk-high"
                          }
                        />
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Mitigation Score</span>
                          <span className={`text-sm font-medium ${
                            assessment.mitigationScore > 70 ? "text-green-600" :
                            assessment.mitigationScore > 40 ? "text-amber-600" :
                            "text-red-600"
                          }`}>
                            {assessment.mitigationScore}%
                          </span>
                        </div>
                        <Progress 
                          value={assessment.mitigationScore} 
                          className="h-2" 
                          indicatorClassName={
                            assessment.mitigationScore > 70 ? "bg-green-500" :
                            assessment.mitigationScore > 40 ? "bg-amber-500" :
                            "bg-red-500"
                          }
                        />
                      </div>
                    </div>
                    
                    {/* Assessment areas */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                        <Building size={16} className="mr-2" />
                        Assessment Areas
                      </h4>
                      <div className="space-y-2">
                        {assessment.assessmentAreas.map((area, index) => (
                          <div 
                            key={index}
                            className={`p-3 border rounded flex justify-between items-center ${
                              area.completed
                                ? area.issues > 0
                                  ? "bg-amber-50 border-amber-200"
                                  : "bg-green-50 border-green-200"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center">
                              {area.completed ? (
                                area.issues > 0 ? (
                                  <AlertTriangle size={16} className="text-amber-500 mr-2" />
                                ) : (
                                  <Check size={16} className="text-green-500 mr-2" />
                                )
                              ) : (
                                <Info size={16} className="text-gray-400 mr-2" />
                              )}
                              <span className="text-sm">{area.name}</span>
                            </div>
                            <div>
                              {area.completed ? (
                                area.issues > 0 ? (
                                  <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
                                    {area.issues} {area.issues === 1 ? 'Issue' : 'Issues'}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                                    No Issues
                                  </Badge>
                                )
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-500">
                                  Pending
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Key findings */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                        <AlertTriangle size={16} className="mr-2" />
                        Key Findings
                      </h4>
                      {assessment.keyFindings.length > 0 ? (
                        <ul className="space-y-2">
                          {assessment.keyFindings.map((finding, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No key findings recorded yet.</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            Export PDF
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate a PDF report of this assessment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {assessment.status !== "approved" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: `Assessment ${assessment.id} updated`,
                                  description: "The assessment has been marked as approved.",
                                });
                              }}
                            >
                              {assessment.status === "completed" ? "Approve" : "Edit"}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {assessment.status === "completed" 
                                ? "Mark this assessment as approved" 
                                : "Edit this assessment"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <AlertTriangle className="mx-auto text-gray-400" size={32} />
            <p className="mt-2 text-gray-500">No assessments match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactAssessment;
