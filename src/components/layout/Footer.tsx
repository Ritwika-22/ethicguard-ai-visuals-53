
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ethic-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Ethic<span className="text-ethic-green">Guard</span></h3>
            <p className="text-gray-300 mb-4">
              Making AI deployment ethical, transparent, and safe for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-ethic-green">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ethic-green">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ethic-green">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-ethic-green transition-colors">Home</a></li>
              <li><a href="/#how-it-works" className="text-gray-300 hover:text-ethic-green transition-colors">How It Works</a></li>
              <li><a href="/#features" className="text-gray-300 hover:text-ethic-green transition-colors">Features</a></li>
              <li><a href="/#demo" className="text-gray-300 hover:text-ethic-green transition-colors">Demo</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-ethic-green transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ethic-green transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ethic-green transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ethic-green transition-colors">Ethics Guidelines</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-ethic-green" />
                <a href="mailto:contact@ethicguard.ai" className="text-gray-300 hover:text-ethic-green transition-colors">
                  contact@ethicguard.ai
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-ethic-green" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-ethic-green transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-ethic-green" />
                <span className="text-gray-300">
                  123 AI Ethics Blvd<br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} EthicGuard AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-ethic-green text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-ethic-green text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-ethic-green text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
