
import { useState } from 'react';
import { Eye, Shield, UserCheck, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

const features = [
  {
    id: 'shadow-mode',
    name: 'Shadow Mode',
    description: 'Test your AI models in a controlled environment that mimics real-world usage without exposing users to potential risks.',
    icon: Eye,
    details: [
      'Side-by-side comparison of AI vs human decisions',
      'Performance metrics and accuracy reporting',
      'Bias detection across different user demographics',
      'Safe testing environment with no user impact'
    ],
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    id: 'privacy-visualizer',
    name: 'Privacy Visualizer',
    description: 'Identify data flow vulnerabilities and potential privacy leaks before they become problems with our visual analysis tools.',
    icon: Shield,
    details: [
      'Interactive data flow diagrams',
      'PII detection and handling visualization',
      'Regulatory compliance checking (GDPR, CCPA, etc.)',
      'Data minimization recommendations'
    ],
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'consent-layer',
    name: 'Consent Layer',
    description: 'Build trust with users through transparent, easy-to-understand consent interfaces that put them in control of their data.',
    icon: UserCheck,
    details: [
      'Customizable consent UI components',
      'Multi-level permission structures',
      'Consent withdrawal tracking',
      'Language localization support',
      'Compliance documentation generation'
    ],
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-500',
  },
  {
    id: 'risk-alerts',
    name: 'Real-Time Risk Alerts',
    description: 'Get notified immediately when potential ethical issues arise, allowing you to address problems before they impact users.',
    icon: Bell,
    details: [
      'Customizable alert thresholds',
      'Multi-channel notifications (email, Slack, SMS)',
      'Risk categorization and prioritization',
      'Historical trend analysis',
      'Resolution workflow tracking'
    ],
    color: 'bg-rose-50 border-rose-100',
    iconColor: 'text-rose-500',
  }
];

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const IconComponent = feature.icon;
  
  return (
    <div className={`feature-card ${feature.color} border-2`}>
      <div className={`feature-icon ${feature.iconColor}`}>
        <IconComponent size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-ethic-navy">{feature.name}</h3>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <span className={`${feature.iconColor} mr-2 mt-1`}>•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState('shadow-mode');
  
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Core Features</h2>
          <p className="section-subheading">
            Comprehensive tools to ensure your AI is ethical, private, and user-friendly
          </p>
        </div>

        <div className="hidden md:block">
          <Tabs defaultValue="shadow-mode" className="w-full" onValueChange={setActiveFeature}>
            <TabsList className="grid grid-cols-4 mb-8">
              {features.map(feature => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="data-[state=active]:text-ethic-green data-[state=active]:border-b-2 data-[state=active]:border-ethic-green"
                >
                  <feature.icon className="mr-2" size={18} />
                  {feature.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {features.map(feature => (
              <TabsContent key={feature.id} value={feature.id} className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-ethic-midgray">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8">
                      <div className={`inline-flex items-center justify-center p-3 rounded-full ${feature.color} ${feature.iconColor} mb-6`}>
                        <feature.icon size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-ethic-navy">{feature.name}</h3>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                      <ul className="space-y-3 mb-6">
                        {feature.details.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <span className={`${feature.iconColor} mr-2`}>•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="bg-ethic-navy hover:bg-ethic-navy/90 text-white">
                        Learn More
                      </Button>
                    </div>
                    <div className="bg-ethic-lightgray flex items-center justify-center p-8">
                      <div className="relative w-full h-64 bg-white rounded-xl shadow-md overflow-hidden border border-ethic-midgray">
                        {/* Feature visualization or mockup */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <feature.icon size={64} className={feature.iconColor + " opacity-20"} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-ethic-navy text-white p-4">
                          <div className="text-sm font-medium">{feature.name} Visualization</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile view */}
        <div className="grid grid-cols-1 md:hidden gap-6">
          {features.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
