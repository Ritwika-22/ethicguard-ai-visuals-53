
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import DemoSection from "@/components/sections/DemoSection";
import AudienceSection from "@/components/sections/AudienceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <AudienceSection />
        <ContactSection />
        
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore our features</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/dashboard/shadow">Shadow Mode Testing</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard/visualizer">Privacy Visualizer</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard/consent">Consent Manager</Link>
            </Button>
            <Button asChild>
              <Link to="/risk-analysis">Risk Analysis</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
