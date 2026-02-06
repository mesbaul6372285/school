import React from 'react';
import { View, Member } from '../types';
import { Menu, X, User, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  currentUser: Member | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', view: View.HOME },
    { label: 'Projects', view: View.PROJECTS },
    { label: 'Gallery', view: View.GALLERY },
    { label: 'Members', view: View.MEMBERS },
  ];

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050b14]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNavClick(View.HOME)}>
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-400 rounded-sm flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
               <span className="text-black font-bold text-xs">Logo</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">SCIENCE CLUB</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Siddheswari Boys' Higher Secondary School</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    currentView === item.view
                      ? 'text-cyan-400 bg-white/5'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Auth Button */}
              {currentUser ? (
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                  <button 
                    onClick={() => setCurrentView(currentUser.role === 'ADMIN' ? View.DASHBOARD_ADMIN : View.DASHBOARD_MEMBER)}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm"
                  >
                    <User size={16} />
                    {currentUser.name.split(' ')[0]}
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentView(View.LOGIN_MEMBER)}
                  className="ml-4 px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                  Member Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a1525] border-b border-white/10 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.view
                    ? 'text-cyan-400 bg-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
             {currentUser ? (
               <>
                <button
                  onClick={() => handleNavClick(currentUser.role === 'ADMIN' ? View.DASHBOARD_ADMIN : View.DASHBOARD_MEMBER)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:bg-gray-900"
                >
                  Dashboard ({currentUser.name})
                </button>
                <button
                  onClick={() => { onLogout(); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-900"
                >
                  Logout
                </button>
               </>
             ) : (
                <button
                  onClick={() => handleNavClick(View.LOGIN_MEMBER)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:bg-gray-900 border-t border-white/5 mt-2"
                >
                  Member Login
                </button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
