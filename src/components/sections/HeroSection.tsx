
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-ethic-navy">
              Test AI <span className="gradient-text">Before</span> It Tests You
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              EthicGuard helps you deploy AI with confidence by testing for ethical issues, privacy concerns, and bias before your models go live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Button 
                asChild
                className="bg-ethic-green hover:bg-ethic-green/90 text-ethic-navy px-8 py-6 text-lg font-bold"
              >
                <Link to="/workspace">
                  Open Workspace
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-ethic-navy text-ethic-navy hover:bg-ethic-navy/5 px-8 py-6 text-lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                How It Works <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-ethic-green/10 to-ethic-accent/10 rounded-xl transform rotate-3"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-xl border border-ethic-midgray">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-ethic-lightgray p-3 rounded-lg">
                    <div className="h-4 w-1/2 bg-ethic-navy/10 rounded-full mb-2"></div>
                    <div className="h-8 bg-ethic-navy/5 rounded-md"></div>
                  </div>
                  <div className="bg-ethic-lightgray p-3 rounded-lg">
                    <div className="h-4 w-3/4 bg-ethic-navy/10 rounded-full mb-2"></div>
                    <div className="h-8 bg-ethic-green/10 rounded-md"></div>
                  </div>
                  <div className="bg-ethic-lightgray p-3 rounded-lg">
                    <div className="h-4 w-2/3 bg-ethic-navy/10 rounded-full mb-2"></div>
                    <div className="h-8 bg-ethic-accent/10 rounded-md"></div>
                  </div>
                  <div className="bg-ethic-lightgray p-3 rounded-lg">
                    <div className="h-4 w-1/2 bg-ethic-navy/10 rounded-full mb-2"></div>
                    <div className="h-8 bg-ethic-navy/5 rounded-md"></div>
                  </div>
                </div>
                <div className="p-4 bg-ethic-navy rounded-lg text-white flex items-center justify-between">
                  <span>AI Model Ethics Score</span>
                  <span className="bg-ethic-green text-ethic-navy rounded-md px-2 py-1 text-sm font-medium">98/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

