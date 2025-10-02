import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Heart, 
  Star, 
  Instagram, 
  Twitter, 
  Facebook, 
  Search, 
  CheckCircle, 
  Filter,
  Calendar,
  ShoppingCart,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Shield,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Play,
  ChefHat,
  Utensils,
  Globe
} from 'lucide-react';

// A small component for the star ratings
const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))}
  </div>
);

const LandingPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const services = [
    {
      icon: Search,
      title: "Smart Recipe Discovery",
      description: "Search through over 1 million recipes with advanced filters for cuisine, diet, and cooking time.",
      features: ["Advanced search filters", "Dietary preferences", "Cuisine types", "Quick search suggestions"]
    },
    {
      icon: Calendar,
      title: "Meal Planning Made Easy",
      description: "Plan your weekly meals with drag-and-drop functionality and automatic nutrition tracking.",
      features: ["Weekly calendar view", "Drag & drop recipes", "Nutrition summaries", "PDF/CSV export"]
    },
    {
      icon: ShoppingCart,
      title: "Automated Shopping Lists",
      description: "Generate smart shopping lists from your meal plans with intelligent ingredient combining.",
      features: ["Auto-generation", "Manual additions", "Category organization", "Print & export"]
    },
    {
      icon: Heart,
      title: "Recipe Management",
      description: "Save your favorite recipes and share them with friends and family across social platforms.",
      features: ["Personal favorites", "Social sharing", "Recipe collections", "Quick access"]
    }
  ];

  const stats = [
    { number: "1M+", label: "Recipes Available", icon: BookOpen },
    { number: "50K+", label: "Happy Users", icon: Users },
    { number: "100K+", label: "Meal Plans Created", icon: Calendar },
    { number: "4.9", label: "Average Rating", icon: Star }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook",
      image: "https://i.pravatar.cc/150?img=1",
      content: "Recipe Planner has completely transformed how I approach meal planning. The drag-and-drop feature is intuitive, and the shopping lists save me so much time!"
    },
    {
      name: "Mike Chen",
      role: "Busy Parent",
      image: "https://i.pravatar.cc/150?img=2",
      content: "As a working parent, this app is a lifesaver. I can plan our family meals for the entire week in just 15 minutes, and the nutrition tracking helps us eat healthier."
    },
    {
      name: "Emily Rodriguez",
      role: "Food Blogger",
      image: "https://i.pravatar.cc/150?img=3",
      content: "The recipe discovery feature is amazing! I've found so many new dishes to try. The social sharing makes it easy to share my favorites with my followers."
    }
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Quick recipe search and instant meal planning" },
    { icon: Shield, title: "Secure & Private", description: "Your data is protected with enterprise-grade security" },
    { icon: Globe, title: "Global Cuisine", description: "Discover recipes from around the world" },
    { icon: Award, title: "Award Winning", description: "Recognized as the best meal planning app of 2024" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
     <div className="relative bg-white overflow-hidden" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
        <div className='z-0 absolute top-30 rotate-24 left-[-50px]'>
          <img src='https://res.cloudinary.com/drhcd0bj6/image/upload/v1759162127/mints_sgsvzb.png' alt='Leaf' className='w-60 h-80 left-0' />
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-8 sm:py-8 lg:py-16 flex flex-col lg:flex-row items-center">
          
        
          <div className="lg:w-1/2 ml-36 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-800 tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              SIMPLE AND <br /> TASTY RECIPES
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0" style={{ fontFamily: "Crimson Text, serif", fontWeight: 400, fontStyle: "bold" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim eu nunc faucibus sit euismod suspendisse bibendum pellentesque lectus. Feugiat scelerisque montes.
            </p>
            
            {/* --- SEARCH BAR (Replaces "Get Started" button) --- */}
            <form onSubmit={handleSearch} className="mt-8 w-full max-w-lg mx-auto lg:mx-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search over 1 million recipes..."
                  className="w-full pl-5 pr-28 py-4 border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-[85%] bg-green-500 text-white font-semibold rounded-full px-6 hover:bg-green-600 transition-colors duration-300 flex items-center"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Filter Buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-medium">Popular:</span>
              {['Vegetarian', 'Quick & Easy', 'Italian', 'Healthy', 'Dessert'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setQuery(tag);
                    navigate(`/search?q=${encodeURIComponent(tag)}`);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex-shrink-0 p-2 border-2 border-gray-200 rounded-full">
                <Heart size={24} className="text-red-500" />
              </div>
              <div className="text-sm text-gray-500 font-medium">PEOPLE LIKED THE RECIPES</div>
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=3" alt="User 3" />
              </div>
            </div>
          </div>

          <div className="lg:w-[40%] right-[40px] flex  lg:justify-end">
            <div className="relative right-18 w-full max-w-md lg:max-w-lg">
              <img 
                src="https://res.cloudinary.com/drhcd0bj6/image/upload/v1759168141/thalis_yih7ek.png"
                alt="Fruit bowl" 
                className="rounded-3xl "
              />

              <div className="absolute top-30  -left-4 sm:-left-12 bg-white rounded-lg shadow-xl p-3 flex items-center gap-3 animate-fade-in-up">
                <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=4" alt="Search user" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Search 1 million+</p>
                  <p className="text-xs text-gray-500">simple recipes</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
              </div>

        
              <div className="absolute bottom-4 sm:right-2 bg-white rounded-lg shadow-xl p-4 w-56 animate-fade-in-up animation-delay-3000">
                <div className="flex items-center gap-3">
                  <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/150?img=5" alt="Kylie Doe" />
                  <div>
                    <p className="font-bold text-gray-900">Kylie Doe</p>
                    <p className="text-sm text-gray-500">Food Enthusiast</p>
                  </div>
                </div>
                <div className="mt-3">
                  <StarRating rating={5} />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 h-3 w-3 bg-red-400 rounded-full"></div>
              <div className="absolute top-12 left-4 h-2 w-2 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-4 left-1/4 h-3 w-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Elements */}
      <img 
        src="https://www.freepnglogos.com/uploads/mint-png/mint-leaf-transparent-png-stickpng-28.png" // Replace with your mint leaf image
        alt="Mint leaf" 
        className="absolute top-0 -left-20 w-48 opacity-80 -z-0 hidden lg:block" 
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 hidden lg:flex flex-col items-center gap-6">
        <span className="text-gray-500 font-semibold uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Follow Us
        </span>
        <div className="h-16 w-px bg-gray-300"></div>
        <a href="#" className="text-gray-500 hover:text-gray-800"><Instagram size={20} /></a>
        <a href="#" className="text-gray-500 hover:text-gray-800"><Twitter size={20} /></a>
        <a href="#" className="text-gray-500 hover:text-gray-800"><Facebook size={20} /></a>
      </div>
    </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                    <Icon size={24} className="text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Meal Planning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From recipe discovery to shopping lists, we've got every aspect of your culinary journey covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={16} className="text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Recipe Planner?
            </h2>
            <p className="text-xl text-gray-600">
              Built with modern technology and designed for real cooks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                    <Icon size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-green-100">
              Join thousands of happy home cooks who love Recipe Planner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of home cooks who have simplified their meal planning with Recipe Planner. 
            Start your culinary journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <ChefHat size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">Recipe Planner</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your all-in-one solution for meal planning, recipe discovery, and smart shopping lists. 
                Making cooking enjoyable for everyone.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors">Browse Recipes</Link></li>
                <li><Link to="/meal-planner" className="text-gray-400 hover:text-white transition-colors">Meal Planner</Link></li>
                <li><Link to="/shopping-list" className="text-gray-400 hover:text-white transition-colors">Shopping Lists</Link></li>
                <li><Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">My Favorites</Link></li>
                <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile Settings</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-green-500" />
                  <span className="text-gray-400">support@recipeplanner.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-green-500" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-green-500" />
                  <span className="text-gray-400">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={16} className="text-green-500" />
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Open Source</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Recipe Planner. All rights reserved. Made with ❤️ for food lovers.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Status</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">API</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;