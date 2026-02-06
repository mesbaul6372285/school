import React from 'react';
import { View } from '../types';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
    setCurrentView: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#03070d] border-t border-white/5 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Info */}
          <div>
            <div className="flex items-center mb-4">
               <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-400 rounded-sm flex items-center justify-center mr-3">
                  <span className="text-black font-bold text-[10px]">Logo</span>
               </div>
               <span className="text-lg font-bold text-white">Science Club</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              Empowering the next generation of scientists and innovators at Siddheswari Boys' Higher Secondary School.
            </p>
            <p className="text-gray-500 text-xs">Est. 1933</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => setCurrentView(View.PROJECTS)} className="hover:text-cyan-400 transition-colors">Projects</button></li>
              <li><button onClick={() => setCurrentView(View.GALLERY)} className="hover:text-cyan-400 transition-colors">Gallery</button></li>
              <li><button onClick={() => setCurrentView(View.REGISTER)} className="hover:text-cyan-400 transition-colors">Membership Application</button></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Ramna, Dhaka, Bangladesh</p>
              <p>Email: scienceclub@sbhss.edu.bd</p>
              <p>Phone: +880 1700-000000</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs">
          <p>© 2024 SBHSS Science Club. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setCurrentView(View.LOGIN_ADMIN)} 
              className="flex items-center gap-1 text-gray-800 hover:text-gray-600 transition-colors"
            >
              <ShieldCheck size={12} />
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
