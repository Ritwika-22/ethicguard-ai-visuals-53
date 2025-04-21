
import { useState } from "react";
import { 
  Shield, 
  Check, 
  X, 
  AlertTriangle, 
  Lock, 
  Search,
  TrendingUp,
  ChevronRight,
  Info,
  Flag,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface MitigationStrategy {
  id: string;
  name: string;
  description: string;
  status: "planned" | "in_progress" | "implemented" | "verified";
  priority: "low" | "medium" | "high";
  implementation: number; // percentage
  targetRisks: string[];
  effort: "minimal" | "moderate" | "significant";
  impact: "low" | "medium" | "high";
  owner?: string;
  dueDate?: string;
}

interface MitigationCategory {
  id: string;
  name: string;
  description: string;
  strategies: MitigationStrategy[];
}

// Mock data
const mockMitigationCategories: MitigationCategory[] = [
  {
    id: "privacy",
    name: "Data Privacy",
    description: "Strategies to protect user data and privacy",
    strategies: [
      {
        id: "MIT-001",
        name: "Privacy by Design Implementation",
        description: "Incorporate privacy considerations throughout the entire development lifecycle",
        status: "in_progress",
        priority: "high",
        implementation: 65,
        targetRisks: ["Unauthorized Data Access", "PII Exposure"],
        effort: "significant",
        impact: "high",
        owner: "Privacy Team",
        dueDate: "2025-06-15"
      },
      {
        id: "MIT-002",
        name: "Data Minimization Policy",
        description: "Collect and retain only the minimum amount of data necessary for the stated purpose",
        status: "implemented",
        priority: "high",
        implementation: 100,
        targetRisks: ["Excessive Data Collection", "Data Retention Issues"],
        effort: "moderate",
        impact: "high",
        owner: "Data Governance",
        dueDate: "2025-05-01"
      },
      {
        id: "MIT-003",
        name: "Granular Consent Controls",
        description: "Provide users with specific consent options for different data types and uses",
        status: "planned",
        priority: "medium",
        implementation: 20,
        targetRisks: ["Consent Non-Compliance", "User Trust Issues"],
        effort: "moderate",
        impact: "medium",
        owner: "UX Team",
        dueDate: "2025-07-30"
      }
    ]
  },
  {
    id: "security",
    name: "Data Security",
    description: "Measures to secure and protect data from unauthorized access",
    strategies: [
      {
        id: "MIT-004",
        name: "End-to-End Encryption",
        description: "Implement strong encryption for data in transit and at rest",
        status: "implemented",
        priority: "high",
        implementation: 100,
        targetRisks: ["Data Breaches", "Unauthorized Access"],
        effort: "significant",
        impact: "high",
        owner: "Security Team",
        dueDate: "2025-03-10"
      },
      {
        id: "MIT-005",
        name: "Access Control Review",
        description: "Regular review and audit of access privileges to sensitive data",
        status: "in_progress",
        priority: "medium",
        implementation: 80,
        targetRisks: ["Internal Data Misuse", "Privilege Escalation"],
        effort: "moderate",
        impact: "medium",
        owner: "Security Team",
        dueDate: "2025-05-15"
      }
    ]
  },
  {
    id: "transparency",
    name: "Transparency & Control",
    description: "Enhance user visibility and control over their data",
    strategies: [
      {
        id: "MIT-006",
        name: "Data Usage Dashboard",
        description: "User-facing dashboard showing how their data is being used",
        status: "in_progress",
        priority: "medium",
        implementation: 45,
        targetRisks: ["Transparency Concerns", "User Trust Issues"],
        effort: "significant",
        impact: "medium",
        owner: "Product Team",
        dueDate: "2025-08-01"
      },
      {
        id: "MIT-007",
        name: "Plain Language Privacy Notices",
        description: "Simplify and clarify privacy communications for users",
        status: "verified",
        priority: "low",
        implementation: 100,
        targetRisks: ["Legal Compliance", "User Understanding"],
        effort: "minimal",
        impact: "medium",
        owner: "Legal Team",
        dueDate: "2025-04-20"
      }
    ]
  },
  {
    id: "ai-ethics",
    name: "AI Ethics & Fairness",
    description: "Ensure AI systems operate fairly and ethically",
    strategies: [
      {
        id: "MIT-008",
        name: "Algorithmic Bias Monitoring",
        description: "Continuous monitoring for potential bias in AI decisions",
        status: "in_progress",
        priority: "high",
        implementation: 60,
        targetRisks: ["Algorithmic Bias", "Discrimination"],
        effort: "significant",
        impact: "high",
        owner: "AI Ethics Team",
        dueDate: "2025-07-01"
      },
      {
        id: "MIT-009",
        name: "Explainability Framework",
        description: "Implement methods to explain AI decisions to users and stakeholders",
        status: "planned",
        priority: "medium",
        implementation: 10,
        targetRisks: ["Black Box AI", "Regulatory Compliance"],
        effort: "significant",
        impact: "medium",
        owner: "AI Development",
        dueDate: "2025-09-15"
      }
    ]
  }
];

const MitigationStrategies = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<MitigationCategory[]>(mockMitigationCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Filter strategies based on active tab, search, status, and priority
  const getFilteredStrategies = () => {
    let filteredCategories = [...categories];
    
    // Filter by tab (category)
    if (activeTab !== "all") {
      filteredCategories = filteredCategories.filter(cat => cat.id === activeTab);
    }
    
    // Apply search and filters to strategies within categories
    filteredCategories = filteredCategories.map(category => ({
      ...category,
      strategies: category.strategies.filter(strategy => {
        // Search filter
        if (
          searchTerm && 
          !strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !strategy.id.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }
        
        // Status filter
        if (statusFilter !== "all" && strategy.status !== statusFilter) {
          return false;
        }
        
        // Priority filter
        if (priorityFilter !== "all" && strategy.priority !== priorityFilter) {
          return false;
        }
        
        return true;
      })
    }));
    
    // Filter out categories with no matching strategies
    return filteredCategories.filter(category => category.strategies.length > 0);
  };

  const filteredCategories = getFilteredStrategies();

  // Update strategy status
  const updateStrategyStatus = (categoryId: string, strategyId: string, newStatus: MitigationStrategy['status']) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          strategies: category.strategies.map(strategy => {
            if (strategy.id === strategyId) {
              return { 
                ...strategy, 
                status: newStatus,
                implementation: newStatus === "implemented" || newStatus === "verified" ? 100 : strategy.implementation
              };
            }
            return strategy;
          })
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    
    toast({
      title: "Strategy Status Updated",
      description: `Strategy ${strategyId} status changed to ${newStatus.replace('_', ' ')}`
    });
  };

  // Helper functions for styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "implemented":
        return "bg-green-50 text-green-700 border-green-200";
      case "verified":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
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

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "minimal":
        return "bg-green-50 text-green-700 border-green-200";
      case "moderate":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "significant":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Shield className="mr-2 text-ethic-navy" size={20} />
            Risk Mitigation Strategies
          </h2>
          <p className="text-gray-500 text-sm">
            Implement measures to reduce identified risks
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => {
              toast({
                title: "New Strategy Created",
                description: "You can now define the details of your new mitigation strategy."
              });
            }}
          >
            Add New Strategy
          </Button>
        </div>
      </div>

      {/* Category tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all" className="flex items-center">
              All Categories
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                {getCategoryIcon(category.id)}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search strategies..."
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
            <option value="planned">Planned</option>
            <option value="in_progress">In Progress</option>
            <option value="implemented">Implemented</option>
            <option value="verified">Verified</option>
          </select>
          
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Strategies List */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map(category => (
          <div key={category.id} className="mb-8">
            {activeTab === "all" && (
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-medium">
                  {getCategoryIcon(category.id)}
                  {category.name}
                </h3>
                <span className="text-sm text-gray-500 ml-2">
                  ({category.strategies.length} {category.strategies.length === 1 ? 'strategy' : 'strategies'})
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.strategies.map(strategy => (
                <Card key={strategy.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline">{strategy.id}</Badge>
                      <Badge variant="outline" className={getStatusBadge(strategy.status)}>
                        {strategy.status.toUpperCase().replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{strategy.name}</CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className={getPriorityBadge(strategy.priority)}>
                        {strategy.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <Badge variant="outline" className={getEffortBadge(strategy.effort)}>
                        {strategy.effort.toUpperCase()} EFFORT
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Implementation Progress</span>
                        <span className="font-medium">{strategy.implementation}%</span>
                      </div>
                      <Progress 
                        value={strategy.implementation} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 mb-2">Addresses Risks:</div>
                      <div className="flex flex-wrap gap-2">
                        {strategy.targetRisks.map((risk, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {strategy.dueDate && (
                      <div className="mt-4 pt-3 border-t text-sm flex justify-between">
                        <div className="flex items-center text-gray-500">
                          {strategy.owner && (
                            <>
                              <span className="mr-3">Owner: {strategy.owner}</span>
                              <span>•</span>
                            </>
                          )}
                          <span className="ml-3">Due: {strategy.dueDate}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowDetails(strategy.id)}
                    >
                      Full Details
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                    {strategy.status !== "verified" && (
                      <div className="space-x-2">
                        {(strategy.status === "planned" || strategy.status === "in_progress") && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                            onClick={() => updateStrategyStatus(category.id, strategy.id, strategy.status === "planned" ? "in_progress" : "implemented")}
                          >
                            {strategy.status === "planned" ? "Start" : "Mark Implemented"}
                          </Button>
                        )}
                        {strategy.status === "implemented" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                            onClick={() => updateStrategyStatus(category.id, strategy.id, "verified")}
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <Shield className="mx-auto text-gray-400" size={32} />
          <p className="mt-2 text-gray-500">No strategies match your criteria</p>
        </div>
      )}

      {/* Strategy details modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
            {categories.map(category => 
              category.strategies.filter(s => s.id === showDetails).map(strategy => (
                <div key={strategy.id}>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{strategy.name}</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="mr-2">{strategy.id}</Badge>
                          <Badge variant="outline" className={getStatusBadge(strategy.status)}>
                            {strategy.status.toUpperCase().replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowDetails(null)}
                      >
                        <X size={18} />
                      </Button>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="mt-1">{strategy.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Implementation Progress</h4>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="text-2xl font-bold">{strategy.implementation}%</div>
                          </div>
                          <div className="flex-grow">
                            <Progress 
                              value={strategy.implementation} 
                              className="h-3" 
                              indicatorClassName={`${
                                strategy.status === "verified" ? "bg-purple-500" :
                                strategy.status === "implemented" ? "bg-green-500" :
                                "bg-blue-500"
                              }`}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Status Timeline</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${strategy.status === "planned" || strategy.status === "in_progress" || strategy.status === "implemented" || strategy.status === "verified" ? "bg-green-500" : "bg-gray-200"}`}></div>
                              <div className="ml-2 text-sm">Planned</div>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${strategy.status === "in_progress" || strategy.status === "implemented" || strategy.status === "verified" ? "bg-green-500" : "bg-gray-200"}`}></div>
                              <div className="ml-2 text-sm">In Progress</div>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${strategy.status === "implemented" || strategy.status === "verified" ? "bg-green-500" : "bg-gray-200"}`}></div>
                              <div className="ml-2 text-sm">Implemented</div>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${strategy.status === "verified" ? "bg-green-500" : "bg-gray-200"}`}></div>
                              <div className="ml-2 text-sm">Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Priority:</span>
                            <Badge variant="outline" className={getPriorityBadge(strategy.priority)}>
                              {strategy.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Effort Required:</span>
                            <Badge variant="outline" className={getEffortBadge(strategy.effort)}>
                              {strategy.effort.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Impact:</span>
                            <Badge variant="outline" className={getPriorityBadge(strategy.impact)}>
                              {strategy.impact.toUpperCase()}
                            </Badge>
                          </div>
                          {strategy.owner && (
                            <div className="flex justify-between">
                              <span className="text-sm">Owner:</span>
                              <span className="text-sm font-medium">{strategy.owner}</span>
                            </div>
                          )}
                          {strategy.dueDate && (
                            <div className="flex justify-between">
                              <span className="text-sm">Due Date:</span>
                              <span className="text-sm font-medium">{strategy.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Target Risks</h4>
                      <div className="space-y-2">
                        {strategy.targetRisks.map((risk, index) => (
                          <div key={index} className="flex items-center">
                            <AlertTriangle size={14} className="text-amber-500 mr-2" />
                            <span>{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Implementation Checklist</h4>
                      <div className="space-y-2 bg-gray-50 border rounded-md p-3">
                        <div className="flex items-center">
                          <Checkbox id="checklist-1" checked={strategy.implementation >= 25} />
                          <label htmlFor="checklist-1" className="ml-2 text-sm">
                            Initial planning complete
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="checklist-2" checked={strategy.implementation >= 50} />
                          <label htmlFor="checklist-2" className="ml-2 text-sm">
                            Implementation started
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="checklist-3" checked={strategy.implementation >= 75} />
                          <label htmlFor="checklist-3" className="ml-2 text-sm">
                            Core functionality complete
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="checklist-4" checked={strategy.implementation >= 100} />
                          <label htmlFor="checklist-4" className="ml-2 text-sm">
                            Testing and validation complete
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 flex justify-end">
                    <Button 
                      variant="outline"
                      onClick={() => setShowDetails(null)}
                      className="mr-2"
                    >
                      Close
                    </Button>
                    {strategy.status !== "verified" && (
                      <Button onClick={() => {
                        updateStrategyStatus(category.id, strategy.id, getNextStatus(strategy.status));
                        setShowDetails(null);
                      }}>
                        {strategy.status === "planned" ? "Start Implementation" : 
                        strategy.status === "in_progress" ? "Mark as Implemented" :
                        "Verify Implementation"}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get icon based on category
function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case "privacy":
      return <Lock className="mr-2 text-blue-500" size={16} />;
    case "security":
      return <Shield className="mr-2 text-red-500" size={16} />;
    case "transparency":
      return <Info className="mr-2 text-green-500" size={16} />;
    case "ai-ethics":
      return <Database className="mr-2 text-purple-500" size={16} />;
    default:
      return <Flag className="mr-2 text-gray-500" size={16} />;
  }
}

// Helper function to get next status
function getNextStatus(currentStatus: string): MitigationStrategy['status'] {
  switch (currentStatus) {
    case "planned":
      return "in_progress";
    case "in_progress":
      return "implemented";
    case "implemented":
      return "verified";
    default:
      return "planned";
  }
}

export default MitigationStrategies;
