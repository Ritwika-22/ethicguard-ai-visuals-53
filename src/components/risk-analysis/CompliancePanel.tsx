
import { useState } from "react";
import { 
  Check, 
  AlertTriangle, 
  X, 
  FileText, 
  Calendar, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Info,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: "compliant" | "partial" | "non_compliant" | "not_applicable";
  regulation: string;
  category: string;
  implementationNotes?: string;
  lastChecked?: string;
  nextReview?: string;
}

interface ComplianceRegulation {
  id: string;
  name: string;
  description: string;
  totalRequirements: number;
  compliantCount: number;
  partialCount: number;
  nonCompliantCount: number;
  notApplicableCount: number;
  requirements: ComplianceRequirement[];
}

// Mock data
const mockRegulations: ComplianceRegulation[] = [
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    totalRequirements: 12,
    compliantCount: 8,
    partialCount: 2,
    nonCompliantCount: 1,
    notApplicableCount: 1,
    requirements: [
      {
        id: "GDPR-001",
        name: "Lawful Basis for Processing",
        description: "Ensure a valid lawful basis for all data processing activities",
        status: "compliant",
        regulation: "GDPR",
        category: "Data Processing",
        implementationNotes: "All processing activities documented with legal basis identified",
        lastChecked: "2025-04-01",
        nextReview: "2025-07-01"
      },
      {
        id: "GDPR-002",
        name: "Data Subject Rights",
        description: "Implement mechanisms for users to exercise their data rights (access, rectification, erasure, etc.)",
        status: "compliant",
        regulation: "GDPR",
        category: "User Rights",
        implementationNotes: "Self-service portal implemented for all data subject rights",
        lastChecked: "2025-04-05",
        nextReview: "2025-07-05"
      },
      {
        id: "GDPR-003",
        name: "Privacy by Design",
        description: "Integrate data protection measures into processing activities from the design stage",
        status: "partial",
        regulation: "GDPR",
        category: "System Design",
        implementationNotes: "Implemented for new systems but legacy systems not fully updated",
        lastChecked: "2025-04-03",
        nextReview: "2025-06-03"
      },
      {
        id: "GDPR-004",
        name: "Data Protection Impact Assessment",
        description: "Conduct DPIAs for high-risk processing activities",
        status: "compliant",
        regulation: "GDPR",
        category: "Risk Assessment",
        implementationNotes: "DPIA process established and documented",
        lastChecked: "2025-03-28",
        nextReview: "2025-06-28"
      },
      {
        id: "GDPR-005",
        name: "International Data Transfers",
        description: "Ensure adequate safeguards for data transferred outside the EU",
        status: "non_compliant",
        regulation: "GDPR",
        category: "Data Transfer",
        implementationNotes: "Standard contractual clauses not implemented for all third parties",
        lastChecked: "2025-04-10",
        nextReview: "2025-05-10"
      },
      {
        id: "GDPR-006",
        name: "Data Breach Notification",
        description: "Procedures to detect, report and investigate personal data breaches",
        status: "compliant",
        regulation: "GDPR",
        category: "Incident Management",
        lastChecked: "2025-03-25",
        nextReview: "2025-06-25"
      },
      {
        id: "GDPR-007",
        name: "Child Data Protection",
        description: "Additional protections for processing children's personal data",
        status: "not_applicable",
        regulation: "GDPR",
        category: "Special Categories",
        implementationNotes: "Service not directed at children under 16",
        lastChecked: "2025-03-20",
        nextReview: "2025-06-20"
      },
      {
        id: "GDPR-008",
        name: "Records of Processing Activities",
        description: "Maintain documentation of all data processing activities",
        status: "compliant",
        regulation: "GDPR",
        category: "Documentation",
        lastChecked: "2025-04-07",
        nextReview: "2025-07-07"
      },
      {
        id: "GDPR-009",
        name: "Data Protection Officer",
        description: "Appoint a DPO if required and define responsibilities",
        status: "compliant",
        regulation: "GDPR",
        category: "Organization",
        implementationNotes: "DPO appointed and contact details published",
        lastChecked: "2025-03-15",
        nextReview: "2025-06-15"
      },
      {
        id: "GDPR-010",
        name: "Consent Management",
        description: "Obtain and manage valid consent for data processing",
        status: "compliant",
        regulation: "GDPR",
        category: "Consent",
        lastChecked: "2025-04-12",
        nextReview: "2025-07-12"
      },
      {
        id: "GDPR-011",
        name: "Data Minimization",
        description: "Collect and retain only necessary personal data",
        status: "partial",
        regulation: "GDPR",
        category: "Data Collection",
        implementationNotes: "Some legacy systems still collect excessive data",
        lastChecked: "2025-04-08",
        nextReview: "2025-06-08"
      },
      {
        id: "GDPR-012",
        name: "Processor Agreements",
        description: "Ensure data processing agreements with all processors",
        status: "compliant",
        regulation: "GDPR",
        category: "Third Parties",
        lastChecked: "2025-03-30",
        nextReview: "2025-06-30"
      }
    ]
  },
  {
    id: "ccpa",
    name: "CCPA",
    description: "California Consumer Privacy Act",
    totalRequirements: 8,
    compliantCount: 5,
    partialCount: 2,
    nonCompliantCount: 0,
    notApplicableCount: 1,
    requirements: [
      {
        id: "CCPA-001",
        name: "Right to Know",
        description: "Process for consumers to request access to their personal information",
        status: "compliant",
        regulation: "CCPA",
        category: "Consumer Rights",
        lastChecked: "2025-04-05",
        nextReview: "2025-07-05"
      },
      {
        id: "CCPA-002",
        name: "Right to Delete",
        description: "Process for consumers to request deletion of their personal information",
        status: "compliant",
        regulation: "CCPA",
        category: "Consumer Rights",
        implementationNotes: "Deletion request workflow fully implemented",
        lastChecked: "2025-04-06",
        nextReview: "2025-07-06"
      },
      {
        id: "CCPA-003",
        name: "Right to Opt-Out",
        description: "Allow consumers to opt out of sale of personal information",
        status: "partial",
        regulation: "CCPA",
        category: "Consumer Rights",
        implementationNotes: "'Do Not Sell My Info' link present but tracking not fully implemented",
        lastChecked: "2025-04-02",
        nextReview: "2025-06-02"
      },
      {
        id: "CCPA-004",
        name: "Privacy Policy",
        description: "Maintain compliant privacy policy with required disclosures",
        status: "compliant",
        regulation: "CCPA",
        category: "Documentation",
        lastChecked: "2025-04-10",
        nextReview: "2025-07-10"
      },
      {
        id: "CCPA-005",
        name: "Financial Incentives",
        description: "Proper disclosures for financial incentive programs",
        status: "not_applicable",
        regulation: "CCPA",
        category: "Incentives",
        implementationNotes: "No financial incentives offered in exchange for data",
        lastChecked: "2025-03-20",
        nextReview: "2025-06-20"
      },
      {
        id: "CCPA-006",
        name: "Non-Discrimination",
        description: "No discrimination against consumers who exercise their rights",
        status: "compliant",
        regulation: "CCPA",
        category: "Consumer Rights",
        lastChecked: "2025-03-28",
        nextReview: "2025-06-28"
      },
      {
        id: "CCPA-007",
        name: "Service Provider Contracts",
        description: "Appropriate contract terms with service providers",
        status: "partial",
        regulation: "CCPA",
        category: "Third Parties",
        implementationNotes: "Some older contracts need to be updated",
        lastChecked: "2025-04-08",
        nextReview: "2025-06-08"
      },
      {
        id: "CCPA-008",
        name: "Verifiable Consumer Requests",
        description: "Process to verify identity for consumer requests",
        status: "compliant",
        regulation: "CCPA",
        category: "Consumer Rights",
        lastChecked: "2025-04-01",
        nextReview: "2025-07-01"
      }
    ]
  },
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    totalRequirements: 5,
    compliantCount: 0,
    partialCount: 2,
    nonCompliantCount: 2,
    notApplicableCount: 1,
    requirements: [
      {
        id: "HIPAA-001",
        name: "Privacy Rule Compliance",
        description: "Safeguards to protect individuals' health information",
        status: "partial",
        regulation: "HIPAA",
        category: "Privacy",
        implementationNotes: "Basic safeguards in place but gaps in policy coverage",
        lastChecked: "2025-04-03",
        nextReview: "2025-05-15"
      },
      {
        id: "HIPAA-002",
        name: "Security Rule Requirements",
        description: "Administrative, technical, and physical safeguards",
        status: "non_compliant",
        regulation: "HIPAA",
        category: "Security",
        implementationNotes: "Technical safeguards incomplete, risk assessment needed",
        lastChecked: "2025-04-05",
        nextReview: "2025-05-05"
      },
      {
        id: "HIPAA-003",
        name: "Breach Notification",
        description: "Procedures for reporting breaches of unsecured PHI",
        status: "partial",
        regulation: "HIPAA",
        category: "Incident Management",
        implementationNotes: "Notification process defined but testing incomplete",
        lastChecked: "2025-04-04",
        nextReview: "2025-06-04"
      },
      {
        id: "HIPAA-004",
        name: "Business Associate Agreements",
        description: "Written contracts with business associates",
        status: "non_compliant",
        regulation: "HIPAA",
        category: "Third Parties",
        implementationNotes: "BAAs not in place for all relevant vendors",
        lastChecked: "2025-04-10",
        nextReview: "2025-05-10"
      },
      {
        id: "HIPAA-005",
        name: "Minimum Necessary Standard",
        description: "Limit uses and disclosures to the minimum necessary",
        status: "not_applicable",
        regulation: "HIPAA",
        category: "Data Handling",
        implementationNotes: "Not currently handling PHI in this context",
        lastChecked: "2025-03-20",
        nextReview: "2025-06-20"
      }
    ]
  }
];

const CompliancePanel = () => {
  const { toast } = useToast();
  const [regulations, setRegulations] = useState<ComplianceRegulation[]>(mockRegulations);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRequirement, setExpandedRequirement] = useState<string |null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<ComplianceRequirement | null>(null);

  // Filter requirements based on search and filters
  const getFilteredRequirements = () => {
    let filteredReqs: ComplianceRequirement[] = [];
    
    if (selectedRegulation) {
      const regulation = regulations.find(r => r.id === selectedRegulation);
      if (regulation) {
        filteredReqs = [...regulation.requirements];
      }
    } else {
      // If no regulation selected, combine all requirements
      regulations.forEach(reg => {
        filteredReqs = [...filteredReqs, ...reg.requirements];
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      filteredReqs = filteredReqs.filter(req => 
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filteredReqs = filteredReqs.filter(req => req.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filteredReqs = filteredReqs.filter(req => req.status === statusFilter);
    }
    
    return filteredReqs;
  };

  const filteredRequirements = getFilteredRequirements();

  // Get unique categories from all requirements
  const getUniqueCategories = () => {
    const categories = new Set<string>();
    regulations.forEach(reg => {
      reg.requirements.forEach(req => {
        categories.add(req.category);
      });
    });
    return Array.from(categories);
  };

  const uniqueCategories = getUniqueCategories();

  // Update requirement status
  const updateRequirementStatus = (requirementId: string, newStatus: ComplianceRequirement['status']) => {
    const updatedRegulations = regulations.map(regulation => {
      const requirementIndex = regulation.requirements.findIndex(req => req.id === requirementId);
      
      if (requirementIndex !== -1) {
        // Update requirement status
        const updatedRequirements = [...regulation.requirements];
        const oldStatus = updatedRequirements[requirementIndex].status;
        updatedRequirements[requirementIndex] = {
          ...updatedRequirements[requirementIndex],
          status: newStatus,
          lastChecked: new Date().toISOString().split('T')[0]
        };
        
        // Update compliance counts
        let updatedRegulation = { ...regulation, requirements: updatedRequirements };
        
        if (oldStatus === "compliant") updatedRegulation.compliantCount--;
        else if (oldStatus === "partial") updatedRegulation.partialCount--;
        else if (oldStatus === "non_compliant") updatedRegulation.nonCompliantCount--;
        else if (oldStatus === "not_applicable") updatedRegulation.notApplicableCount--;
        
        if (newStatus === "compliant") updatedRegulation.compliantCount++;
        else if (newStatus === "partial") updatedRegulation.partialCount++;
        else if (newStatus === "non_compliant") updatedRegulation.nonCompliantCount++;
        else if (newStatus === "not_applicable") updatedRegulation.notApplicableCount++;
        
        return updatedRegulation;
      }
      
      return regulation;
    });
    
    setRegulations(updatedRegulations);
    
    if (selectedRequirement && selectedRequirement.id === requirementId) {
      setSelectedRequirement({
        ...selectedRequirement,
        status: newStatus,
        lastChecked: new Date().toISOString().split('T')[0]
      });
    }
    
    toast({
      title: "Compliance Status Updated",
      description: `Requirement ${requirementId} status changed to ${newStatus.replace('_', ' ')}`
    });
  };

  // Helper functions for styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-50 text-green-700 border-green-200";
      case "partial":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "non_compliant":
        return "bg-red-50 text-red-700 border-red-200";
      case "not_applicable":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Format status text
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  // Calculate overall compliance percentage
  const calculateCompliancePercentage = (regulation: ComplianceRegulation) => {
    const applicableCount = regulation.totalRequirements - regulation.notApplicableCount;
    if (applicableCount === 0) return 100;
    
    const score = (regulation.compliantCount + (regulation.partialCount * 0.5)) / applicableCount;
    return Math.round(score * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Check className="mr-2 text-ethic-navy" size={20} />
            Compliance Management
          </h2>
          <p className="text-gray-500 text-sm">
            Track regulatory compliance for your AI and data practices
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => {
              toast({
                title: "Compliance Report Generated",
                description: "Your compliance report has been downloaded."
              });
            }}
            variant="outline"
            className="mr-2"
          >
            <FileText className="mr-2" size={16} />
            Export Report
          </Button>
          <Button
            onClick={() => {
              toast({
                title: "Compliance Scan Started",
                description: "Scanning your systems for compliance issues..."
              });
            }}
          >
            Run Compliance Scan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regulations.map(regulation => (
              <Card key={regulation.id} className="overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{regulation.name}</h3>
                    <Badge variant="outline">
                      {calculateCompliancePercentage(regulation)}% Compliant
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{regulation.description}</p>
                  
                  <Progress 
                    value={calculateCompliancePercentage(regulation)} 
                    className="h-2 mb-4" 
                    indicatorClassName={
                      calculateCompliancePercentage(regulation) > 80 ? "bg-green-500" :
                      calculateCompliancePercentage(regulation) > 50 ? "bg-amber-500" :
                      "bg-red-500"
                    }
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-700">
                        {regulation.compliantCount}
                      </div>
                      <div className="text-xs text-gray-600">Compliant</div>
                    </div>
                    <div className="text-center p-2 bg-amber-50 rounded">
                      <div className="text-lg font-bold text-amber-700">
                        {regulation.partialCount}
                      </div>
                      <div className="text-xs text-gray-600">Partial</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="text-lg font-bold text-red-700">
                        {regulation.nonCompliantCount}
                      </div>
                      <div className="text-xs text-gray-600">Non-Compliant</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-lg font-bold text-gray-700">
                        {regulation.notApplicableCount}
                      </div>
                      <div className="text-xs text-gray-600">N/A</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {regulation.totalRequirements} Requirements
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedRegulation(regulation.id);
                      setActiveTab("requirements");
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 flex items-center justify-center p-6">
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  className="mb-2 h-12 w-12 rounded-full"
                  onClick={() => {
                    toast({
                      title: "Add Regulation",
                      description: "Feature to add custom regulations coming soon."
                    });
                  }}
                >
                  +
                </Button>
                <div className="text-gray-500">Add Regulation</div>
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Calendar className="mr-2" size={18} />
              Upcoming Compliance Deadlines
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requirement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regulation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Review
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {regulations
                    .flatMap(reg => reg.requirements)
                    .filter(req => req.nextReview)
                    .sort((a, b) => a.nextReview!.localeCompare(b.nextReview!))
                    .slice(0, 5)
                    .map(req => (
                      <tr key={req.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{req.name}</div>
                          <div className="text-sm text-gray-500">{req.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {req.regulation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className={getStatusBadge(req.status)}>
                            {formatStatus(req.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {req.nextReview}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements" className="mt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search requirements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <select 
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedRegulation || "all"}
                onChange={(e) => setSelectedRegulation(e.target.value === "all" ? null : e.target.value)}
              >
                <option value="all">All Regulations</option>
                {regulations.map(reg => (
                  <option key={reg.id} value={reg.id}>{reg.name}</option>
                ))}
              </select>
              
              <select 
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="compliant">Compliant</option>
                <option value="partial">Partial</option>
                <option value="non_compliant">Non-Compliant</option>
                <option value="not_applicable">Not Applicable</option>
              </select>
            </div>
          </div>

          {filteredRequirements.length > 0 ? (
            <div className="space-y-4">
              {filteredRequirements.map(requirement => (
                <div key={requirement.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className={`p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center ${expandedRequirement === requirement.id ? "border-b" : ""}`}
                    onClick={() => setExpandedRequirement(expandedRequirement === requirement.id ? null : requirement.id)}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{requirement.id}</Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {requirement.regulation}
                        </Badge>
                        <Badge variant="outline" className={getStatusBadge(requirement.status)}>
                          {formatStatus(requirement.status)}
                        </Badge>
                      </div>
                      <h3 className="font-medium mt-2">{requirement.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{requirement.description}</p>
                    </div>
                    <div>
                      {expandedRequirement === requirement.id ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedRequirement === requirement.id && (
                    <div className="p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Details</h4>
                          <table className="min-w-full text-sm">
                            <tbody>
                              <tr>
                                <td className="py-1 pr-4 text-gray-500">Category:</td>
                                <td>{requirement.category}</td>
                              </tr>
                              {requirement.lastChecked && (
                                <tr>
                                  <td className="py-1 pr-4 text-gray-500">Last Reviewed:</td>
                                  <td>{requirement.lastChecked}</td>
                                </tr>
                              )}
                              {requirement.nextReview && (
                                <tr>
                                  <td className="py-1 pr-4 text-gray-500">Next Review:</td>
                                  <td>{requirement.nextReview}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                          
                          {requirement.implementationNotes && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Implementation Notes:</h4>
                              <p className="text-sm bg-white p-3 rounded border">{requirement.implementationNotes}</p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
                          <RadioGroup 
                            defaultValue={requirement.status}
                            onValueChange={(value) => updateRequirementStatus(
                              requirement.id, 
                              value as ComplianceRequirement['status']
                            )}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="compliant" id={`${requirement.id}-compliant`} />
                              <Label 
                                htmlFor={`${requirement.id}-compliant`}
                                className="flex items-center"
                              >
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                Compliant
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="partial" id={`${requirement.id}-partial`} />
                              <Label 
                                htmlFor={`${requirement.id}-partial`}
                                className="flex items-center"
                              >
                                <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                                Partial
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="non_compliant" id={`${requirement.id}-non-compliant`} />
                              <Label 
                                htmlFor={`${requirement.id}-non-compliant`}
                                className="flex items-center"
                              >
                                <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                                Non-Compliant
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="not_applicable" id={`${requirement.id}-not-applicable`} />
                              <Label 
                                htmlFor={`${requirement.id}-not-applicable`}
                                className="flex items-center"
                              >
                                <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                                Not Applicable
                              </Label>
                            </div>
                          </RadioGroup>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm"
                              onClick={() => setSelectedRequirement(requirement)}
                            >
                              Update Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <AlertTriangle className="mx-auto text-gray-400" size={32} />
              <p className="mt-2 text-gray-500">No requirements match your criteria</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="audit-log" className="mt-6">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Status Update</td>
                  <td className="px-6 py-4 text-sm">Changed GDPR-003 status from "partial" to "compliant"</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-18</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Documentation Added</td>
                  <td className="px-6 py-4 text-sm">Uploaded data processing flowchart for GDPR-001</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">System</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Compliance Scan</td>
                  <td className="px-6 py-4 text-sm">Automated scan detected 3 potential compliance issues</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-12</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Assessment Complete</td>
                  <td className="px-6 py-4 text-sm">Completed quarterly compliance assessment</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Ahmed Hassan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Status Update</td>
                  <td className="px-6 py-4 text-sm">Changed CCPA-007 status from "non-compliant" to "partial"</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Requirement details modal */}
      {selectedRequirement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{selectedRequirement.name}</h3>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2">{selectedRequirement.id}</Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {selectedRequirement.regulation}
                    </Badge>
                    <Badge variant="outline" className={`ml-2 ${getStatusBadge(selectedRequirement.status)}`}>
                      {formatStatus(selectedRequirement.status)}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedRequirement(null)}
                >
                  <X size={18} />
                </Button>
              </div>

              <p className="mt-4">{selectedRequirement.description}</p>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Implementation Notes</h4>
                <textarea 
                  className="w-full h-32 border rounded p-2 text-sm"
                  value={selectedRequirement.implementationNotes || ""}
                  placeholder="Add implementation notes here..."
                />
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Supporting Evidence</h4>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="text-gray-500">
                    <FileText size={32} className="mx-auto mb-2" />
                    <p>Drop files here or click to upload</p>
                    <p className="text-xs mt-2">Accepted file types: PDF, DOC, DOCX, JPG, PNG</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Reviewed
                  </label>
                  <Input 
                    type="date" 
                    value={selectedRequirement.lastChecked || ""} 
                    onChange={() => {}} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Review Date
                  </label>
                  <Input 
                    type="date" 
                    value={selectedRequirement.nextReview || ""} 
                    onChange={() => {}} 
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex justify-end">
              <Button 
                variant="outline"
                onClick={() => setSelectedRequirement(null)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Requirement Updated",
                    description: `${selectedRequirement.id} details have been updated.`
                  });
                  setSelectedRequirement(null);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompliancePanel;
