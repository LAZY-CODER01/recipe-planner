
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, LayoutGrid, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  const handleSignOut = useAuthStore((state) => state.handleSignOut);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search?q=', label: 'Recipes' },
    { to: '/meal-planner', label: 'Meal Planner' },
    { to: '/shopping-list', label: 'Shopping List' },
    { to: '/favorites', label: 'Favorites' },
    { to: '/about', label: 'About & Help' },
  ];


  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-15">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-full">
              <UtensilsCrossed size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-gray-800">
              COOK<span className="text-green-500">ING</span>
            </span>
          </NavLink>
          {/* User Menu */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <NavLink 
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block">{currentUser.displayName || 'Profile'}</span>
                </NavLink>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <NavLink 
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Login
              </NavLink>
            )}
          </div>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-gray-600 font-medium tracking-wide hover:text-green-500 transition-colors duration-300 pb-2 ${
                      isActive ? 'border-b-2 border-green-500' : 'border-b-2 border-transparent'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <LayoutGrid size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <LayoutGrid size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                  className={({ isActive }) =>
                    `text-lg font-medium ${isActive ? 'text-green-500' : 'text-gray-700'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;