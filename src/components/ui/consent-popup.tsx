
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserCheck, Shield, Info, X } from 'lucide-react';

interface ConsentPopupProps {
  open: boolean;
  onClose: () => void;
}

const ConsentPopup = ({ open, onClose }: ConsentPopupProps) => {
  const [consents, setConsents] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  const [tab, setTab] = useState('simple');
  
  // Can't disable necessary cookies
  const handleConsentChange = (type: keyof typeof consents) => {
    if (type === 'necessary') return;
    
    setConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  const handleAcceptAll = () => {
    setConsents({
      necessary: true,
      analytics: true,
      marketing: true
    });
    onClose();
  };
  
  const handleSavePreferences = () => {
    // Save the current consent preferences
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ethic-navy">
            <UserCheck className="mr-2 text-ethic-green" size={20} />
            Privacy &amp; Consent Preferences
          </DialogTitle>
          <DialogDescription>
            Control how EthicGuard uses your data. You can customize your preferences at any time.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="simple" className="w-full" onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="simple">Simple View</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple" className="animate-fade-in">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-ethic-navy">Necessary Cookies</h4>
                    <p className="text-sm text-gray-500">Required for the website to function properly</p>
                  </div>
                  <Switch checked={consents.necessary} disabled />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-ethic-navy">Analytics Cookies</h4>
                    <p className="text-sm text-gray-500">Help us improve by tracking how you use the site</p>
                  </div>
                  <Switch 
                    checked={consents.analytics} 
                    onCheckedChange={() => handleConsentChange('analytics')} 
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-ethic-navy">Marketing Cookies</h4>
                    <p className="text-sm text-gray-500">Allow us to provide personalized marketing</p>
                  </div>
                  <Switch 
                    checked={consents.marketing} 
                    onCheckedChange={() => handleConsentChange('marketing')} 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="animate-fade-in">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-ethic-navy">Necessary Cookies</h4>
                    <p className="text-sm text-gray-500">Required for the website to function properly</p>
                  </div>
                  <Switch checked={consents.necessary} disabled />
                </div>
                <div className="text-xs text-gray-500 p-3 bg-white rounded border border-gray-100">
                  <p className="mb-2">
                    <strong>Purpose:</strong> These cookies are essential for the website to function properly and cannot be disabled.
                  </p>
                  <p className="mb-2">
                    <strong>Data Collected:</strong> Session information, login status, form submissions.
                  </p>
                  <p>
                    <strong>Storage Period:</strong> Session only
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-ethic-navy">Analytics Cookies</h4>
                    <p className="text-sm text-gray-500">Help us improve by tracking how you use the site</p>
                  </div>
                  <Switch 
                    checked={consents.analytics} 
                    onCheckedChange={() => handleConsentChange('analytics')} 
                  />
                </div>
                <div className="text-xs text-gray-500 p-3 bg-white rounded border border-gray-100">
                  <p className="mb-2">
                    <strong>Purpose:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                  </p>
                  <p className="mb-2">
                    <strong>Data Collected:</strong> Pages visited, time spent, navigation paths, anonymized device info.
                  </p>
                  <p>
                    <strong>Storage Period:</strong> 1 year
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-ethic-navy">Marketing Cookies</h4>
                    <p className="text-sm text-gray-500">Allow us to provide personalized marketing</p>
                  </div>
                  <Switch 
                    checked={consents.marketing} 
                    onCheckedChange={() => handleConsentChange('marketing')} 
                  />
                </div>
                <div className="text-xs text-gray-500 p-3 bg-white rounded border border-gray-100">
                  <p className="mb-2">
                    <strong>Purpose:</strong> These cookies allow us to personalize marketing content to match your interests.
                  </p>
                  <p className="mb-2">
                    <strong>Data Collected:</strong> Browsing preferences, content interests, referring websites.
                  </p>
                  <p>
                    <strong>Storage Period:</strong> 6 months
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded text-sm text-blue-700 border border-blue-100">
                <Info size={16} className="mr-2 flex-shrink-0" />
                <p>
                  You can change your preferences at any time by clicking the "Privacy Preferences" link in the footer.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:order-first">
            <X size={16} className="mr-2" />
            Decline All
          </Button>
          <Button onClick={handleSavePreferences} variant="outline" className="border-ethic-navy text-ethic-navy">
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll} className="bg-ethic-green hover:bg-ethic-green/90 text-white">
            <Shield size={16} className="mr-2" />
            Accept All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentPopup;
