
import { 
  CheckCircle, 
  Shield, 
  Eye, 
  UserCheck, 
  Bell 
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Connect Your Model',
    description: 'Easily integrate with our API or use our platform connectors for major AI frameworks.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Shadow Mode Testing',
    description: 'Run your AI alongside human decisions to compare outputs without going live.',
    icon: Eye,
  },
  {
    id: 3,
    title: 'Privacy & Consent Setup',
    description: 'Configure how user data is handled and what consent options are presented.',
    icon: UserCheck,
  },
  {
    id: 4,
    title: 'Monitoring & Alerts',
    description: 'Get real-time notifications for ethical concerns or potential issues.',
    icon: Bell,
  },
  {
    id: 5,
    title: 'Deployment with Confidence',
    description: 'Launch your AI with the certainty that ethical considerations are addressed.',
    icon: CheckCircle,
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-ethic-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">How EthicGuard Works</h2>
          <p className="section-subheading">
            Our simple process helps you validate your AI models before they reach production
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex mb-8 last:mb-0">
              <div className="mr-6 relative">
                <div className="w-12 h-12 rounded-full bg-ethic-navy flex items-center justify-center text-white">
                  <step.icon size={22} />
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -ml-[1px] h-12 bg-ethic-midgray"></div>
                )}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-ethic-midgray flex-1 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-semibold text-ethic-navy mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
