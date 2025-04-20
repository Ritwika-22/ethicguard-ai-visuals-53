
import { useState } from 'react';
import { ArrowRight, Eye, Shield, UserCheck, Bell, Database, Check, AlertTriangle, Settings, Search } from 'lucide-react';

const WorkflowDiagramSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: 0,
      title: 'Connect AI Model',
      icon: Database,
      color: 'bg-ethic-navy text-white',
    },
    {
      id: 1,
      title: 'Shadow Mode Testing',
      icon: Eye,
      color: 'bg-blue-500 text-white',
    },
    {
      id: 2,
      title: 'Privacy Analysis',
      icon: Shield,
      color: 'bg-green-500 text-white',
    },
    {
      id: 3,
      title: 'Consent Layer Setup',
      icon: UserCheck,
      color: 'bg-yellow-500 text-white',
    },
    {
      id: 4,
      title: 'Monitor & Alert',
      icon: Bell,
      color: 'bg-red-500 text-white',
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const stepDetails = [
    {
      title: 'Model Integration',
      description: 'Connect your AI model to EthicGuard using our API or platform integrations',
      image: (
        <div className="h-full flex flex-col items-center justify-center">
          <Database size={48} className="text-ethic-navy mb-4" />
          <div className="w-full h-24 bg-white rounded-lg shadow-md border border-ethic-midgray flex items-center justify-center">
            <div className="flex space-x-4">
              <div className="w-20 h-8 bg-ethic-navy rounded-md"></div>
              <ArrowRight size={20} className="text-ethic-navy" />
              <div className="w-20 h-8 bg-ethic-green rounded-md"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Side-by-Side Comparison',
      description: 'Test model outputs against human decisions without affecting users',
      image: (
        <div className="h-full flex flex-col items-center justify-center">
          <Eye size={48} className="text-blue-500 mb-4" />
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-md border border-ethic-midgray">
              <div className="text-sm font-medium mb-2 text-center text-gray-500">Human</div>
              <div className="h-16 bg-ethic-lightgray rounded-md flex items-center justify-center">
                <Check size={24} className="text-ethic-green" />
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md border border-ethic-midgray">
              <div className="text-sm font-medium mb-2 text-center text-gray-500">AI</div>
              <div className="h-16 bg-ethic-lightgray rounded-md flex items-center justify-center">
                <Check size={24} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Data Flow Analysis',
      description: 'Visualize how data moves through your model and identify potential privacy issues',
      image: (
        <div className="h-full flex flex-col items-center justify-center">
          <Shield size={48} className="text-green-500 mb-4" />
          <div className="w-full bg-white rounded-lg shadow-md border border-ethic-midgray p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-ethic-lightgray flex items-center justify-center">
                <Database size={16} />
              </div>
              <ArrowRight size={16} />
              <div className="w-8 h-8 rounded-full bg-ethic-lightgray flex items-center justify-center">
                <Settings size={16} />
              </div>
              <ArrowRight size={16} />
              <div className="w-8 h-8 rounded-full bg-ethic-lightgray flex items-center justify-center">
                <Search size={16} />
              </div>
            </div>
            <div className="h-6 w-full bg-gradient-to-r from-green-100 to-green-300 rounded-md"></div>
          </div>
        </div>
      )
    },
    {
      title: 'User Permission Controls',
      description: 'Set up transparent opt-in/opt-out interfaces for user data collection',
      image: (
        <div className="h-full flex flex-col items-center justify-center">
          <UserCheck size={48} className="text-yellow-500 mb-4" />
          <div className="w-full bg-white rounded-lg shadow-md border border-ethic-midgray p-4">
            <div className="mb-3">
              <div className="h-6 w-3/4 bg-ethic-lightgray rounded-md mb-2"></div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-sm border border-ethic-navy"></div>
                <div className="h-4 w-1/2 bg-ethic-lightgray rounded-md"></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-sm border border-ethic-navy flex items-center justify-center">
                  <Check size={12} className="text-ethic-navy" />
                </div>
                <div className="h-4 w-2/3 bg-ethic-lightgray rounded-md"></div>
              </div>
            </div>
            <div className="w-1/3 h-8 bg-ethic-navy rounded-md"></div>
          </div>
        </div>
      )
    },
    {
      title: 'Real-Time Alerts',
      description: 'Get notified immediately when potential ethical issues are detected',
      image: (
        <div className="h-full flex flex-col items-center justify-center">
          <Bell size={48} className="text-red-500 mb-4" />
          <div className="w-full bg-white rounded-lg shadow-md border border-ethic-midgray p-4">
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertTriangle size={16} className="text-red-500 mr-2" />
              <div className="text-sm">Potential bias detected in output</div>
            </div>
            <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md flex items-center">
              <AlertTriangle size={16} className="text-yellow-500 mr-2" />
              <div className="text-sm">PII handling needs review</div>
            </div>
            <div className="p-2 bg-blue-50 border border-blue-200 rounded-md flex items-center">
              <Bell size={16} className="text-blue-500 mr-2" />
              <div className="text-sm">New model version available</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="workflow" className="py-16 md:py-24 bg-gradient-to-b from-white to-ethic-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Workflow Diagram</h2>
          <p className="section-subheading">
            See how EthicGuard's features work together to ensure ethical AI deployment
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center mb-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute h-1 bg-ethic-midgray top-7 left-1/2 transform -translate-x-1/2" style={{ width: 'calc(100% - 200px)' }}></div>
            
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`relative z-10 mx-2 mb-4 md:mb-0 cursor-pointer transition-all ${activeStep === index ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mb-2`}>
                    <step.icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-center">{step.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-ethic-midgray animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-ethic-navy">{stepDetails[activeStep].title}</h3>
                <p className="text-gray-600 mb-6">{stepDetails[activeStep].description}</p>
                
                <div className="bg-ethic-lightgray p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check size={16} className="text-ethic-green mr-2 mt-1" />
                      <span>Seamless integration with your existing workflow</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-ethic-green mr-2 mt-1" />
                      <span>Real-time feedback and monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-ethic-green mr-2 mt-1" />
                      <span>Comprehensive documentation and reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-ethic-lightgray rounded-xl p-6 h-64 md:h-auto">
                {stepDetails[activeStep].image}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowDiagramSection;
