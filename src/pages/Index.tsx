
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WorkflowDiagramSection from '@/components/sections/WorkflowDiagramSection';
import DemoSection from '@/components/sections/DemoSection';
import AudienceSection from '@/components/sections/AudienceSection';
import ContactSection from '@/components/sections/ContactSection';
import ConsentPopup from '@/components/ui/consent-popup';

const Index = () => {
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  useEffect(() => {
    // Show consent popup after a small delay
    const timer = setTimeout(() => {
      // Check if user has already given consent
      if (!localStorage.getItem('ethicguard-consent')) {
        setShowConsentPopup(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleConsentClose = () => {
    setShowConsentPopup(false);
    // In a real app, this would save the consent preferences
    localStorage.setItem('ethicguard-consent', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <WorkflowDiagramSection />
        <DemoSection />
        <AudienceSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      <ConsentPopup open={showConsentPopup} onClose={handleConsentClose} />
    </div>
  );
};

export default Index;
