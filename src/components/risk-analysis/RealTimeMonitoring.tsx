
import { useState, useEffect } from "react";
import { 
  Eye, 
  Info, 
  AlertTriangle, 
  Bell, 
  Check, 
  X, 
  Database, 
  Search,
  Lock,
  Shield
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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

interface MonitoringEvent {
  id: string;
  timestamp: string;
  eventType: "data_access" | "data_sharing" | "consent_change" | "policy_violation" | "system";
  description: string;
  severity: "info" | "low" | "medium" | "high" | "critical";
  source: string;
  affectedData?: string[];
  isAlert: boolean;
  status: "new" | "acknowledged" | "resolved";
}

// Mock monitoring events
const mockEvents: MonitoringEvent[] = [
  {
    id: "EVT-1234",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    eventType: "data_access",
    description: "Unusual access pattern detected for user location data",
    severity: "medium",
    source: "Data Access API",
    affectedData: ["Location Data", "User IDs"],
    isAlert: true,
    status: "new"
  },
  {
    id: "EVT-1233",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    eventType: "data_sharing",
    description: "Third-party data sharing initiated for marketing analytics",
    severity: "info",
    source: "Marketing System",
    affectedData: ["Anonymized Usage Data"],
    isAlert: false,
    status: "acknowledged"
  },
  {
    id: "EVT-1232",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    eventType: "consent_change",
    description: "User updated their data sharing preferences",
    severity: "info",
    source: "Privacy Settings",
    isAlert: false,
    status: "resolved"
  },
  {
    id: "EVT-1231",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    eventType: "policy_violation",
    description: "Data retention policy exceeded for user search history",
    severity: "high",
    source: "Storage Audit",
    affectedData: ["Search History", "User Behavior Data"],
    isAlert: true,
    status: "new"
  },
  {
    id: "EVT-1230",
    timestamp: new Date(Date.now() - 55 * 60000).toISOString(),
    eventType: "system",
    description: "Privacy monitoring system started",
    severity: "info",
    source: "System",
    isAlert: false,
    status: "resolved"
  },
  {
    id: "EVT-1229",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    eventType: "data_access",
    description: "Bulk data export requested by admin user",
    severity: "medium",
    source: "Admin Panel",
    affectedData: ["User Profiles", "Activity Logs"],
    isAlert: true,
    status: "acknowledged"
  },
  {
    id: "EVT-1228",
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
    eventType: "policy_violation",
    description: "Sensitive data detected in logs",
    severity: "high",
    source: "Log Analyzer",
    affectedData: ["System Logs", "Error Reports"],
    isAlert: true,
    status: "acknowledged"
  },
];

// Mock monitoring rules
const mockRules = [
  { 
    id: "RULE-001", 
    name: "Unusual Data Access Pattern", 
    description: "Detect unusual patterns in data access frequency or volume", 
    enabled: true,
    severity: "medium"
  },
  { 
    id: "RULE-002", 
    name: "PII Data Detection", 
    description: "Scan for personally identifiable information in unexpected places", 
    enabled: true,
    severity: "high"
  },
  { 
    id: "RULE-003", 
    name: "Third-Party Data Sharing", 
    description: "Monitor when data is shared with external systems", 
    enabled: true,
    severity: "medium"
  },
  { 
    id: "RULE-004", 
    name: "Consent Change Tracking", 
    description: "Track changes to user consent preferences", 
    enabled: true,
    severity: "low"
  },
  { 
    id: "RULE-005", 
    name: "Data Retention Compliance", 
    description: "Ensure data is not kept beyond retention policy limits", 
    enabled: true,
    severity: "high"
  },
];

const RealTimeMonitoring = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<MonitoringEvent[]>(mockEvents);
  const [rules, setRules] = useState(mockRules);
  const [activeTab, setActiveTab] = useState<"events" | "rules">("events");
  const [filters, setFilters] = useState({
    showOnlyAlerts: false,
    eventType: "all",
    severity: "all",
    search: "",
  });
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);

  // Simulate real-time events coming in
  useEffect(() => {
    if (!isMonitoringActive) return;
    
    const interval = setInterval(() => {
      const randomEvent: MonitoringEvent = {
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        eventType: ["data_access", "data_sharing", "consent_change", "policy_violation", "system"][
          Math.floor(Math.random() * 5)
        ] as any,
        description: "New monitoring event detected",
        severity: ["info", "low", "medium", "high", "critical"][Math.floor(Math.random() * 5)] as any,
        source: "Real-time Monitor",
        isAlert: Math.random() > 0.7,
        status: "new",
      };
      
      if (randomEvent.isAlert) {
        toast({
          title: `New Alert: ${randomEvent.id}`,
          description: randomEvent.description,
          variant: randomEvent.severity === "high" || randomEvent.severity === "critical" 
            ? "destructive" 
            : "default",
        });
      }
      
      setEvents(prev => [randomEvent, ...prev.slice(0, 49)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isMonitoringActive, toast]);

  // Toggle monitoring
  const toggleMonitoring = () => {
    setIsMonitoringActive(!isMonitoringActive);
    toast({
      title: isMonitoringActive ? "Monitoring paused" : "Monitoring activated",
      description: isMonitoringActive 
        ? "Real-time monitoring has been paused" 
        : "Real-time monitoring is now active",
    });
  };

  // Update event status
  const updateEventStatus = (id: string, status: "acknowledged" | "resolved") => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status } : event
    ));
    
    toast({
      title: `Event ${id} ${status}`,
      description: status === "acknowledged" 
        ? "This event has been acknowledged" 
        : "This event has been resolved",
    });
  };

  // Toggle rule enabled state
  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: rule.enabled ? `Rule ${id} disabled` : `Rule ${id} enabled`,
        description: rule.enabled 
          ? `"${rule.name}" monitoring rule has been disabled` 
          : `"${rule.name}" monitoring rule has been enabled`,
      });
    }
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    if (filters.showOnlyAlerts && !event.isAlert) return false;
    if (filters.eventType !== "all" && event.eventType !== filters.eventType) return false;
    if (filters.severity !== "all" && event.severity !== filters.severity) return false;
    if (filters.search && !event.description.toLowerCase().includes(filters.search.toLowerCase()) && 
        !event.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "data_access":
        return <Database className="text-blue-500" size={16} />;
      case "data_sharing":
        return <Shield className="text-purple-500" size={16} />;
      case "consent_change":
        return <Check className="text-green-500" size={16} />;
      case "policy_violation":
        return <AlertTriangle className="text-red-500" size={16} />;
      case "system":
        return <Info className="text-gray-500" size={16} />;
      default:
        return <Info className="text-gray-500" size={16} />;
    }
  };

  // Get severity style
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "high":
        return "bg-risk-highBg text-red-700 border-risk-highBorder";
      case "medium":
        return "bg-risk-mediumBg text-amber-700 border-risk-mediumBorder";
      case "low":
        return "bg-risk-lowBg text-green-700 border-risk-lowBorder";
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Eye className="mr-2 text-ethic-navy" size={20} />
            Real-Time Privacy Monitoring
          </h2>
          <p className="text-gray-500 text-sm">
            Monitor your system for privacy and ethical concerns in real-time
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="flex items-center mr-4">
            <span className={`text-sm mr-2 ${isMonitoringActive ? 'text-ethic-green' : 'text-gray-500'}`}>
              {isMonitoringActive ? 'Monitoring Active' : 'Monitoring Paused'}
            </span>
            <Switch 
              checked={isMonitoringActive} 
              onCheckedChange={toggleMonitoring} 
            />
          </div>
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "Monitoring log exported",
                description: "The monitoring log has been exported to CSV.",
              });
            }}
          >
            Export Log
          </Button>
        </div>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === "events" ? "border-b-2 border-ethic-green text-ethic-green" : "text-gray-500"}`}
          onClick={() => setActiveTab("events")}
        >
          <Bell className="inline mr-2 h-4 w-4" />
          Events & Alerts
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "rules" ? "border-b-2 border-ethic-green text-ethic-green" : "text-gray-500"}`}
          onClick={() => setActiveTab("rules")}
        >
          <Shield className="inline mr-2 h-4 w-4" />
          Monitoring Rules
        </button>
      </div>

      {activeTab === "events" ? (
        <>
          {/* Events filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <select 
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.eventType}
                onChange={(e) => setFilters({...filters, eventType: e.target.value})}
              >
                <option value="all">All Types</option>
                <option value="data_access">Data Access</option>
                <option value="data_sharing">Data Sharing</option>
                <option value="consent_change">Consent Change</option>
                <option value="policy_violation">Policy Violation</option>
                <option value="system">System</option>
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
                <option value="info">Info</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-alerts"
                  checked={filters.showOnlyAlerts}
                  onCheckedChange={(checked) => setFilters({...filters, showOnlyAlerts: checked})}
                />
                <label htmlFor="show-alerts" className="text-sm cursor-pointer select-none">
                  Alerts Only
                </label>
              </div>
            </div>
          </div>

          {/* Events table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Status</TableHead>
                  <TableHead className="w-[80px]">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Severity</TableHead>
                  <TableHead className="w-[120px]">Time</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>
                        {event.isAlert ? (
                          <Badge variant="outline" className={
                            event.status === "new" ? "bg-red-50 text-red-700 border-red-200" :
                            event.status === "acknowledged" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                            "bg-green-50 text-green-700 border-green-200"
                          }>
                            {event.status === "new" ? "New" : 
                             event.status === "acknowledged" ? "Ack" : "Resolved"}
                          </Badge>
                        ) : (
                          <span className="text-gray-400 text-sm">Event</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                {getEventTypeIcon(event.eventType)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">
                                {event.eventType.replace('_', ' ')}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start flex-col">
                          <span className="text-sm font-medium flex items-center">
                            {event.description}
                            {event.isAlert && event.status === "new" && (
                              <Badge className="ml-2 bg-red-600 text-white">New</Badge>
                            )}
                          </span>
                          {event.affectedData && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {event.affectedData.map((data, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {data}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <span className="text-xs text-gray-500 mt-1">
                            Source: {event.source}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSeverityStyle(event.severity)}>
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {event.isAlert && event.status === "new" ? (
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => updateEventStatus(event.id, "acknowledged")}
                            >
                              Acknowledge
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateEventStatus(event.id, "resolved")}
                            >
                              <Check size={14} />
                            </Button>
                          </div>
                        ) : event.isAlert && event.status === "acknowledged" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 px-2 text-xs border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                            onClick={() => updateEventStatus(event.id, "resolved")}
                          >
                            Resolve
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No events match your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <>
          {/* Rules list */}
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Monitoring Rules</h3>
            <Button variant="outline" size="sm">
              Add New Rule
            </Button>
          </div>
          <div className="space-y-4">
            {rules.map(rule => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <h4 className="font-medium mr-2">{rule.name}</h4>
                    <Badge variant="outline" className={getSeverityStyle(rule.severity)}>
                      {rule.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{rule.enabled ? 'Enabled' : 'Disabled'}</span>
                    <Switch 
                      checked={rule.enabled} 
                      onCheckedChange={() => toggleRule(rule.id)} 
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{rule.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Rule ID: {rule.id}</span>
                  <Button variant="ghost" size="sm">Edit Rule</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RealTimeMonitoring;
