
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  AlertTriangle, 
  Database, 
  Lock, 
  Flag, 
  Check, 
  Info, 
  TrendingUp, 
  Mail,
  ArrowUpRight,
  Search,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DataClassificationPanel from "@/components/risk-analysis/DataClassificationPanel";
import RiskDetectionPanel from "@/components/risk-analysis/RiskDetectionPanel";
import RealTimeMonitoring from "@/components/risk-analysis/RealTimeMonitoring";
import ImpactAssessment from "@/components/risk-analysis/ImpactAssessment";
import MitigationStrategies from "@/components/risk-analysis/MitigationStrategies";
import CompliancePanel from "@/components/risk-analysis/CompliancePanel";

const RiskAnalysis = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for overview panel
  const [overviewData, setOverviewData] = useState({
    riskScore: 65,
    criticalRisks: 3,
    highRisks: 8,
    mediumRisks: 12,
    lowRisks: 24,
    complianceScore: 82,
    dataCategories: {
      personal: 35,
      sensitive: 15,
      location: 10,
      behavioral: 25,
      technical: 15,
    },
    recentAlerts: [
      {
        id: 1,
        title: "Unauthorized data access attempt",
        severity: "high",
        time: "10 minutes ago",
        isNew: true,
      },
      {
        id: 2,
        title: "Potential PII exposure in API response",
        severity: "high",
        time: "25 minutes ago",
        isNew: true,
      },
      {
        id: 3,
        title: "Unusual data export pattern detected",
        severity: "medium",
        time: "1 hour ago",
        isNew: false,
      },
      {
        id: 4,
        title: "User consent preferences updated",
        severity: "low",
        time: "2 hours ago",
        isNew: false,
      },
    ],
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Demo function to mark alert as addressed
  const markAlertAsAddressed = (id: number) => {
    setOverviewData(prev => ({
      ...prev,
      recentAlerts: prev.recentAlerts.filter(alert => alert.id !== id)
    }));
    
    toast({
      title: "Alert addressed",
      description: "This alert has been marked as resolved.",
    });
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-risk-highBg border-risk-highBorder text-red-700";
      case "medium":
        return "bg-risk-mediumBg border-risk-mediumBorder text-amber-700";
      case "low":
        return "bg-risk-lowBg border-risk-lowBorder text-green-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  // Get risk score color
  const getRiskScoreColor = (score: number) => {
    if (score < 40) return "text-risk-low";
    if (score < 70) return "text-risk-medium";
    return "text-risk-high";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ethic-navy flex items-center">
            <Shield className="mr-2 text-ethic-green" />
            Risk Analysis Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of AI data privacy and ethical risks
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={() => {
              toast({
                title: "Analysis report generated",
                description: "Your risk analysis report has been generated and downloaded.",
              });
            }}
          >
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data-classification">Data Classification</TabsTrigger>
          <TabsTrigger value="risk-detection">Risk Detection</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="impact">Impact Assessment</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ethic-green"></div>
            </div>
          ) : (
            <>
              {/* Risk Score and Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Overall Risk Score */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Overall Risk Score</h3>
                    <Info size={18} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className={`text-4xl font-bold ${getRiskScoreColor(overviewData.riskScore)}`}>
                        {overviewData.riskScore}
                      </div>
                      <div className="text-sm text-gray-500">out of 100</div>
                    </div>
                    <div className="flex-grow">
                      <Progress 
                        value={overviewData.riskScore} 
                        className="h-3" 
                        indicatorClassName={
                          overviewData.riskScore < 40 ? "bg-risk-low" : 
                          overviewData.riskScore < 70 ? "bg-risk-medium" : 
                          "bg-risk-high"
                        }
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-risk-low">Low</span>
                        <span className="text-xs text-risk-medium">Medium</span>
                        <span className="text-xs text-risk-high">High</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Risk Distribution</h3>
                    <Info size={18} className="text-gray-400" />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-red-600">
                        {overviewData.criticalRisks}
                      </div>
                      <div className="text-xs text-gray-500">Critical</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-risk-high">
                        {overviewData.highRisks}
                      </div>
                      <div className="text-xs text-gray-500">High</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-risk-medium">
                        {overviewData.mediumRisks}
                      </div>
                      <div className="text-xs text-gray-500">Medium</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-risk-low">
                        {overviewData.lowRisks}
                      </div>
                      <div className="text-xs text-gray-500">Low</div>
                    </div>
                  </div>
                </div>

                {/* Compliance Status */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Compliance Score</h3>
                    <Info size={18} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="text-4xl font-bold text-blue-600">
                        {overviewData.complianceScore}%
                      </div>
                      <div className="text-sm text-gray-500">Completion</div>
                    </div>
                    <div className="flex-grow">
                      <Progress value={overviewData.complianceScore} className="h-3 bg-blue-100" indicatorClassName="bg-blue-600" />
                      <div className="flex justify-between mt-2">
                        <div className="flex items-center">
                          <Check size={14} className="text-green-500 mr-1" />
                          <span className="text-xs">GDPR</span>
                        </div>
                        <div className="flex items-center">
                          <Check size={14} className="text-green-500 mr-1" />
                          <span className="text-xs">CCPA</span>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle size={14} className="text-yellow-500 mr-1" />
                          <span className="text-xs">HIPAA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts and Data Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Alerts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Recent Alerts</h3>
                    <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/risk")}>
                      View All
                      <ArrowUpRight size={14} className="ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {overviewData.recentAlerts.length > 0 ? (
                      overviewData.recentAlerts.map((alert) => (
                        <div 
                          key={alert.id}
                          className={`p-3 rounded-lg border flex justify-between items-center ${getSeverityColor(alert.severity)}`}
                        >
                          <div className="flex items-center">
                            <AlertTriangle size={16} className="mr-2" />
                            <div>
                              <div className="font-medium text-sm flex items-center">
                                {alert.title}
                                {alert.isNew && (
                                  <Badge variant="outline" className="ml-2 text-xs bg-blue-50 border-blue-200 text-blue-700">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs opacity-80">
                                {alert.time}
                              </div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => markAlertAsAddressed(alert.id)}
                            className="h-7 w-7 p-0"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No active alerts
                      </div>
                    )}
                  </div>
                </div>

                {/* Data Categories */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Data Categories</h3>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("data-classification")}>
                      View Details
                      <ArrowUpRight size={14} className="ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(overviewData.dataCategories).map(([category, percentage]) => (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm capitalize">{category}</span>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center py-6 border-dashed"
                  onClick={() => setActiveTab("risk-detection")}
                >
                  <Search size={18} className="mr-2 text-ethic-navy" />
                  Run Risk Detection
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center py-6 border-dashed"
                  onClick={() => setActiveTab("monitoring")}
                >
                  <Shield size={18} className="mr-2 text-ethic-navy" />
                  Configure Monitoring
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center py-6 border-dashed"
                  onClick={() => setActiveTab("mitigation")}
                >
                  <TrendingUp size={18} className="mr-2 text-ethic-navy" />
                  Review Mitigations
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center py-6 border-dashed"
                  onClick={() => setActiveTab("compliance")}
                >
                  <Check size={18} className="mr-2 text-ethic-navy" />
                  Check Compliance
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="data-classification">
          <DataClassificationPanel />
        </TabsContent>

        <TabsContent value="risk-detection">
          <RiskDetectionPanel />
        </TabsContent>

        <TabsContent value="monitoring">
          <RealTimeMonitoring />
        </TabsContent>

        <TabsContent value="impact">
          <ImpactAssessment />
        </TabsContent>

        <TabsContent value="mitigation">
          <MitigationStrategies />
        </TabsContent>

        <TabsContent value="compliance">
          <CompliancePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAnalysis;
