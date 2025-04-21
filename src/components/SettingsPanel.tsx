
import { useState } from "react";
import {
  SettingsIcon,
  Sun,
  Moon,
  Languages,
  Bell,
  Lock,
  Save,
  RefreshCw,
  DownloadCloud,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function SettingsPanel() {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("english");
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [privacyMode, setPrivacyMode] = useState("balanced");
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate saving delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  const handleResetSettings = () => {
    setTheme("system");
    setLanguage("english");
    setNotifications(true);
    setAnalytics(true);
    setAutoSave(true);
    setPrivacyMode("balanced");
    
    toast({
      title: "Settings reset",
      description: "All settings have been restored to defaults.",
    });
  };
  
  const handleExportSettings = () => {
    const settings = {
      theme,
      language,
      notifications,
      analytics,
      autoSave,
      privacyMode
    };
    
    // Create a download link for settings
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "ethicguard-settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "Settings exported",
      description: "Your settings have been downloaded as a JSON file.",
    });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Settings</h2>
      <p className="text-muted-foreground mb-8">
        Configure your workspace preferences and account settings.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Appearance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-ethic-green" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how EthicGuard looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={theme} 
                onValueChange={setTheme}
              >
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={language} 
                onValueChange={setLanguage}
              >
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-ethic-green" />
              Privacy
            </CardTitle>
            <CardDescription>
              Control your privacy and data sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics" className="font-medium">Usage Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve EthicGuard by sharing usage data
                </p>
              </div>
              <Switch 
                id="analytics"
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">Privacy Mode</Label>
              <RadioGroup 
                value={privacyMode} 
                onValueChange={setPrivacyMode}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <Label htmlFor="minimal">Minimal data collection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced">Balanced (recommended)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enhanced" id="enhanced" />
                  <Label htmlFor="enhanced">Enhanced features (more data sharing)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-ethic-green" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-medium">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for important events
                </p>
              </div>
              <Switch 
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="font-medium">Notification Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="alerts" defaultChecked />
                  <Label htmlFor="alerts" className="text-sm">
                    Security Alerts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reports" defaultChecked />
                  <Label htmlFor="reports" className="text-sm">
                    Weekly Reports
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="updates" defaultChecked />
                  <Label htmlFor="updates" className="text-sm">
                    Product Updates
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Advanced Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-ethic-green" />
              Advanced
            </CardTitle>
            <CardDescription>
              Configure advanced system settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autosave" className="font-medium">Auto-Save</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save changes to data models
                </p>
              </div>
              <Switch 
                id="autosave"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex">
                <Input 
                  id="api-key" 
                  type="password" 
                  defaultValue="sk_test_ethicguard_ai_123456789" 
                  className="rounded-r-none"
                />
                <Button variant="outline" className="rounded-l-none border-l-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Used for accessing EthicGuard API services
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
        <Button 
          variant="outline"
          className="gap-2"
          onClick={handleResetSettings}
        >
          <RefreshCw className="h-4 w-4" />
          Reset to Defaults
        </Button>
        
        <Button 
          variant="outline"
          className="gap-2"
          onClick={handleExportSettings}
        >
          <DownloadCloud className="h-4 w-4" />
          Export Settings
        </Button>
        
        <Button 
          className="gap-2"
          onClick={handleSaveSettings}
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
