
import React from 'react';
import { Code, Building, Scale, Shield } from 'lucide-react';

const personas = [
  {
    title: 'AI Developers',
    icon: Code,
    description: 'Integrate ethical testing into your development workflow with minimal friction',
    benefits: [
      'Simple API integration and language support',
      'Detailed logs for debugging ethical issues',
      'Test suites for common biases and fairness concerns',
      'Post-deployment monitoring and feedback loops'
    ],
    color: 'border-blue-200 bg-blue-50',
    iconClass: 'text-blue-500 bg-blue-100'
  },
  {
    title: 'Enterprises',
    icon: Building,
    description: 'Deploy AI with confidence, knowing you've addressed ethical and privacy concerns',
    benefits: [
      'Enterprise-grade security and compliance features',
      'Governance frameworks for AI deployment',
      'Advanced reporting tools for stakeholders',
      'Customer trust through ethical commitment'
    ],
    color: 'border-green-200 bg-green-50',
    iconClass: 'text-green-500 bg-green-100'
  },
  {
    title: 'Legal & Compliance',
    icon: Scale,
    description: 'Ensure your AI systems meet regulatory requirements for fairness and privacy',
    benefits: [
      'Comprehensive documentation for regulators',
      'GDPR, CCPA, and emerging AI regulation compliance',
      'Audit trail of ethical testing and improvements',
      'Proactive risk mitigation strategies'
    ],
    color: 'border-purple-200 bg-purple-50',
    iconClass: 'text-purple-500 bg-purple-100'
  },
  {
    title: 'Privacy Officers',
    icon: Shield,
    description: 'Visualize and manage how user data flows through AI systems',
    benefits: [
      'Data flow visualization and monitoring',
      'PII detection and protection measures',
      'User consent management tooling',
      'Data minimization recommendations'
    ],
    color: 'border-amber-200 bg-amber-50',
    iconClass: 'text-amber-500 bg-amber-100'
  }
];

const AudienceSection = () => {
  return (
    <section id="who-its-for" className="py-16 md:py-24 bg-ethic-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Who It's For</h2>
          <p className="section-subheading">
            EthicGuard serves everyone involved in AI development and deployment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {personas.map((persona, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-6 border ${persona.color} hover:shadow-md transition-shadow animate-slide-up`} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-full ${persona.iconClass} mr-4`}>
                  <persona.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-ethic-navy">{persona.title}</h3>
                  <p className="text-gray-600 mb-4">{persona.description}</p>
                  
                  <h4 className="font-medium mb-2 text-ethic-navy">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {persona.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-ethic-green mr-2">•</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
