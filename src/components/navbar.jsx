
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Menu, 
  X, 
  Search,
  Heart,
  Calendar,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  Home,
  BookOpen,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  const handleSignOut = useAuthStore((state) => state.handleSignOut);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
  
    { to: '/meal-planner', label: 'Meal Planner', icon: Calendar },
    { to: '/shopping-list', label: 'Shopping List', icon: ShoppingCart },
    { to: '/favorites', label: 'Favorites', icon: Heart },
    { to: '/about', label: 'About & Help', icon: HelpCircle },
  ];


  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className={`bg-gradient-to-r from-green-500 to-green-600 p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
              isScrolled ? 'shadow-md' : ''
            }`}>
              <UtensilsCrossed size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-gray-800 hidden sm:block">
              Recipe<span className="text-green-500">Planner</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-green-50 text-green-600 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-green-500'
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span className="hidden xl:block">{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-sm">
                      {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-gray-700 font-medium">
                    {currentUser.displayName || 'User'}
                  </span>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} />
                      Profile & Settings
                    </NavLink>
                    
                    <NavLink
                      to="/favorites"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart size={16} />
                      My Favorites
                    </NavLink>
                    
                    <NavLink
                      to="/meal-planner"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Calendar size={16} />
                      Meal Planner
                    </NavLink>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
              >
                Sign In
              </NavLink>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                          isActive 
                            ? 'bg-green-50 text-green-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      <Icon size={20} />
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            
            {/* Mobile User Section */}
            {currentUser && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {currentUser.displayName || 'User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 space-y-1">
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Settings size={18} />
                    Profile & Settings
                  </NavLink>
                  
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;