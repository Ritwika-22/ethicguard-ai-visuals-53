
import PrivacyVisualizer from "@/components/PrivacyVisualizer";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play } from 'lucide-react';

// Demo Section: Only PrivacyVisualizer and video dialog
const DemoSection = () => {
  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Interactive Demo</h2>
          <p className="section-subheading">
            See how EthicGuard helps you build ethical AI systems
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Privacy Visualizer replaces all tabbed demos */}
          <PrivacyVisualizer />

          <div className="flex justify-center mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-ethic-navy hover:bg-ethic-navy/90 text-white">
                  <Play className="mr-2" size={16} />
                  Watch Full Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>EthicGuard AI Demo Video</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-ethic-navy rounded-md flex items-center justify-center">
                  <Play className="text-white opacity-50" size={64} />
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                  This would be replaced with an actual video in a production environment
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

