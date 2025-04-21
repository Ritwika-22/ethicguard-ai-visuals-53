
import { useState } from "react";
import { Database, Lock, Shield, AlertTriangle, Search, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Mock data categories
const dataCategories = [
  { 
    id: 1, 
    name: "User Profile Data", 
    type: "Personal", 
    sensitivity: "high",
    fields: ["Full Name", "Email", "Date of Birth", "User ID", "Profile Picture"],
    processingPurpose: "Account creation and management",
    sharingScope: "Internal only",
    retentionPeriod: "Account lifetime + 30 days",
    riskScore: 78
  },
  { 
    id: 2, 
    name: "Device Information", 
    type: "Technical", 
    sensitivity: "medium",
    fields: ["IP Address", "Browser Type", "Device Type", "Operating System", "Screen Resolution"],
    processingPurpose: "Service improvement and debugging",
    sharingScope: "Internal analytics teams",
    retentionPeriod: "90 days",
    riskScore: 52
  },
  { 
    id: 3, 
    name: "User Location", 
    type: "Location", 
    sensitivity: "high",
    fields: ["GPS Coordinates", "IP-based Location", "City", "Country", "Timezone"],
    processingPurpose: "Localized content delivery",
    sharingScope: "Internal and third-party content providers",
    retentionPeriod: "30 days",
    riskScore: 85
  },
  { 
    id: 4, 
    name: "Usage Analytics", 
    type: "Behavioral", 
    sensitivity: "medium",
    fields: ["Pages Visited", "Time Spent", "Features Used", "Click Patterns", "Interaction Sequences"],
    processingPurpose: "Product improvement and personalization",
    sharingScope: "Internal product teams",
    retentionPeriod: "180 days",
    riskScore: 45
  },
  { 
    id: 5, 
    name: "Payment Information", 
    type: "Sensitive", 
    sensitivity: "high",
    fields: ["Credit Card Number (truncated)", "Billing Address", "Purchase History"],
    processingPurpose: "Payment processing",
    sharingScope: "Payment processors only",
    retentionPeriod: "Legal minimum (7 years)",
    riskScore: 92
  },
  { 
    id: 6, 
    name: "Communication Preferences", 
    type: "Personal", 
    sensitivity: "low",
    fields: ["Email Preferences", "Notification Settings", "Marketing Opt-ins"],
    processingPurpose: "Communication delivery",
    sharingScope: "Internal communications team",
    retentionPeriod: "Account lifetime",
    riskScore: 25
  },
];

const DataClassificationPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState<null | typeof dataCategories[0]>(null);

  // Filter data based on search term
  const filteredData = dataCategories.filter(
    category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get appropriate styling based on sensitivity
  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
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

  // Get risk score color
  const getRiskScoreColor = (score: number) => {
    if (score < 40) return "text-risk-low";
    if (score < 70) return "text-risk-medium";
    return "text-risk-high";
  };

  // Get icon based on data type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "personal":
        return <Lock size={16} />;
      case "sensitive":
        return <Shield size={16} />;
      case "location":
        return <AlertTriangle size={16} />;
      default:
        return <Database size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Database className="mr-2 text-ethic-navy" size={20} />
            Data Classification
          </h2>
          <p className="text-gray-500 text-sm">
            Identify and categorize data by sensitivity and risk levels
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search data categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="ml-2">
            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList>
                <TabsTrigger value="list" className="text-xs">List</TabsTrigger>
                <TabsTrigger value="grid" className="text-xs">Grid</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <Tabs value={activeView}>
        <TabsContent value="list" className="mt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sensitivity</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Retention</TableHead>
                  <TableHead>Sharing</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(category.type)}
                          <span className="ml-1">{category.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getSensitivityColor(category.sensitivity)}`}>
                          {category.sensitivity.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`font-semibold ${getRiskScoreColor(category.riskScore)}`}>
                            {category.riskScore}
                          </span>
                          <Progress 
                            value={category.riskScore} 
                            className="ml-2 w-16 h-2" 
                            indicatorClassName={
                              category.riskScore < 40 ? "bg-risk-low" : 
                              category.riskScore < 70 ? "bg-risk-medium" : 
                              "bg-risk-high"
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>{category.retentionPeriod}</TableCell>
                      <TableCell>{category.sharingScope}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      No data categories match your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((category) => (
                <div 
                  key={category.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium truncate">{category.name}</h3>
                    <Badge variant="outline" className={`${getSensitivityColor(category.sensitivity)}`}>
                      {category.sensitivity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    {getTypeIcon(category.type)}
                    <span className="ml-1">{category.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="text-gray-500">Risk Score</div>
                      <div className={`font-semibold ${getRiskScoreColor(category.riskScore)}`}>
                        {category.riskScore}/100
                      </div>
                    </div>
                    <Progress 
                      value={category.riskScore} 
                      className="w-20 h-2" 
                      indicatorClassName={
                        category.riskScore < 40 ? "bg-risk-low" : 
                        category.riskScore < 70 ? "bg-risk-medium" : 
                        "bg-risk-high"
                      }
                    />
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {category.fields.slice(0, 3).map((field, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                      {category.fields.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.fields.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No data categories match your search
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Data category detail modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{selectedCategory.name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  &times;
                </Button>
              </div>

              <div className="flex items-center mt-2 mb-4">
                <Badge variant="outline" className={`mr-2 ${getSensitivityColor(selectedCategory.sensitivity)}`}>
                  {selectedCategory.sensitivity.toUpperCase()} SENSITIVITY
                </Badge>
                <div className="flex items-center">
                  {getTypeIcon(selectedCategory.type)}
                  <span className="ml-1 text-gray-600">{selectedCategory.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 mt-6">
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Data Fields</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCategory.fields.map((field, index) => (
                      <li key={index} className="text-gray-700">{field}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Risk Assessment</h4>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Score:</span>
                    <span className={`font-bold ${getRiskScoreColor(selectedCategory.riskScore)}`}>
                      {selectedCategory.riskScore}/100
                    </span>
                  </div>
                  <Progress 
                    value={selectedCategory.riskScore} 
                    className="h-2 mb-4" 
                    indicatorClassName={
                      selectedCategory.riskScore < 40 ? "bg-risk-low" : 
                      selectedCategory.riskScore < 70 ? "bg-risk-medium" : 
                      "bg-risk-high"
                    }
                  />
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Processing Purpose</h4>
                  <p className="text-gray-700">{selectedCategory.processingPurpose}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Sharing Scope</h4>
                  <p className="text-gray-700">{selectedCategory.sharingScope}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Retention Period</h4>
                  <p className="text-gray-700">{selectedCategory.retentionPeriod}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t">
                <h4 className="font-medium mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {selectedCategory.sensitivity === "high" && (
                    <div className="flex items-start">
                      <Shield className="text-ethic-green mr-2 mt-0.5" size={16} />
                      <span>Implement additional encryption for this data category</span>
                    </div>
                  )}
                  {selectedCategory.riskScore > 70 && (
                    <div className="flex items-start">
                      <AlertTriangle className="text-amber-500 mr-2 mt-0.5" size={16} />
                      <span>Review data sharing practices to reduce risk score</span>
                    </div>
                  )}
                  <div className="flex items-start">
                    <Info className="text-blue-500 mr-2 mt-0.5" size={16} />
                    <span>Document legal basis for processing this data category</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <Button 
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="mr-2"
              >
                Close
              </Button>
              <Button>
                Edit Classification
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataClassificationPanel;
