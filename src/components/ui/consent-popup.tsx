
import { useState } from 'react';
import { X, Shield, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface ConsentPopupProps {
  open: boolean;
  onClose: () => void;
}

const ConsentPopup = ({ open, onClose }: ConsentPopupProps) => {
  const [consents, setConsents] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const handleConsentChange = (type: keyof typeof consents) => {
    if (type === 'necessary') return; // Can't change necessary consents
    setConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAcceptAll = () => {
    setConsents({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
    onClose();
  };

  const handleSavePreferences = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="mr-2 h-5 w-5 text-ethic-green" />
            Privacy & Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Control how your data is collected and used on our site.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="bg-gray-50 p-3 rounded-md border">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <Switch id="necessary" checked={consents.necessary} disabled />
                </div>
                <div>
                  <label htmlFor="necessary" className="font-medium block">Necessary</label>
                  <p className="text-sm text-gray-600">Required for the site to function properly.</p>
                </div>
              </div>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md border">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <Switch 
                    id="analytics" 
                    checked={consents.analytics} 
                    onCheckedChange={() => handleConsentChange('analytics')}
                  />
                </div>
                <div>
                  <label htmlFor="analytics" className="font-medium block">Analytics</label>
                  <p className="text-sm text-gray-600">Help us improve by allowing anonymous usage data.</p>
                </div>
              </div>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md border">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <Switch 
                    id="preferences" 
                    checked={consents.preferences} 
                    onCheckedChange={() => handleConsentChange('preferences')}
                  />
                </div>
                <div>
                  <label htmlFor="preferences" className="font-medium block">Preferences</label>
                  <p className="text-sm text-gray-600">Remember settings and customize your experience.</p>
                </div>
              </div>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md border">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <Switch 
                    id="marketing" 
                    checked={consents.marketing} 
                    onCheckedChange={() => handleConsentChange('marketing')}
                  />
                </div>
                <div>
                  <label htmlFor="marketing" className="font-medium block">Marketing</label>
                  <p className="text-sm text-gray-600">Allow us to personalize ads and content for you.</p>
                </div>
              </div>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
          <Button
            type="button"
            onClick={handleAcceptAll}
            className="bg-ethic-green hover:bg-ethic-green/90 text-white"
          >
            Accept All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentPopup;
