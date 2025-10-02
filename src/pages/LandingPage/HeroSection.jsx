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
  Quote,
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
  Globe,Sparkles,
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
    icon: Utensils,
    title: "Smart Recipe Discovery",
    description: "Discover personalized recipes based on your taste preferences, dietary needs, and available ingredients.",
    features: [
      "AI-powered recommendations",
      "Dietary filters & preferences",
      "Ingredient substitutions"
    ],
    gradient: "from-orange-400 to-red-500"
  },
  {
    icon: ShoppingCart,
    title: "Automated Shopping Lists",
    description: "Generate smart shopping lists automatically from your meal plans and keep track of your pantry.",
    features: [
      "One-click list generation",
      "Pantry inventory tracking",
      "Store location optimization"
    ],
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "Meal Planning Calendar",
    description: "Plan your entire week with our intuitive drag-and-drop calendar interface and scheduling tools.",
    features: [
      "Drag & drop interface",
      "Weekly/monthly views",
      "Schedule notifications"
    ],
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: BookOpen,
    title: "Nutrition Tracking",
    description: "Track your nutritional intake and get insights into your eating habits with detailed analytics.",
    features: [
      "Calorie & macro tracking",
      "Nutritional insights",
      "Progress visualization"
    ],
    gradient: "from-green-400 to-emerald-500"
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
    role: "Home Chef & Mom",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "This app has completely changed how I plan meals for my family. What used to take hours now takes minutes!",
    rating: 5,
    badge: "Power User"
  },
  {
    name: "Michael Chen",
    role: "Food Blogger",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "As someone who creates content around cooking, this tool has been invaluable for organizing my recipes and meal prep.",
    rating: 5,
    badge: "Content Creator"
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "The AI suggestions are spot-on! It understands my preferences and helps me discover new recipes I actually enjoy.",
    rating: 5,
    badge: "Early Adopter"
  }
];

 const features = [
  {
    icon: Clock,
    title: "Save Time Daily",
    description: "Cut meal planning time from hours to minutes with smart automation",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-50",
    shadowColor: "shadow-blue-500/20"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. We never share your recipes or meal plans",
    color: "from-green-500 to-emerald-400",
    bgColor: "bg-green-50",
    shadowColor: "shadow-green-500/20"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant recipe search and meal plan generation powered by AI",
    color: "from-yellow-500 to-orange-400",
    bgColor: "bg-yellow-50",
    shadowColor: "shadow-yellow-500/20"
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Designed by home cooks who understand your kitchen struggles",
    color: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-50",
    shadowColor: "shadow-pink-500/20"
  },
  {
    icon: Sparkles,
    title: "Smart AI",
    description: "Intelligent suggestions that learn from your preferences",
    color: "from-purple-500 to-violet-400",
    bgColor: "bg-purple-50",
    shadowColor: "shadow-purple-500/20"
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Plan meals for the whole family with dietary preferences",
    color: "from-indigo-500 to-blue-400",
    bgColor: "bg-indigo-50",
    shadowColor: "shadow-indigo-500/20"
  },
  {
    icon: TrendingUp,
    title: "Always Improving",
    description: "Regular updates with new features based on your feedback",
    color: "from-teal-500 to-cyan-400",
    bgColor: "bg-teal-50",
    shadowColor: "shadow-teal-500/20"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Curated recipes from top chefs and cooking enthusiasts",
    color: "from-amber-500 to-orange-400",
    bgColor: "bg-amber-50",
    shadowColor: "shadow-amber-500/20"
  }
];
  const [hoveredIndex, setHoveredIndex] = useState(null);
   const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);


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
        <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4 shadow-sm">
            ✨ Premium Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need for
            <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Perfect Meal Planning
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From recipe discovery to shopping lists, we've got every aspect of your culinary journey covered with intelligent tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                }}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                
                {/* Card content */}
                <div className="relative p-8">
                  <div className="flex items-start gap-5">
                    {/* Icon with gradient background */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                        <Icon size={28} className="text-white" strokeWidth={2.5} />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features list */}
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-3 text-gray-700 group/item"
                            style={{
                              animation: isHovered ? `slideIn 0.3s ease-out ${featureIndex * 0.1}s both` : 'none'
                            }}
                          >
                            <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center shadow-sm`}>
                              <CheckCircle size={14} className="text-white" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-green-700 hover:to-emerald-600">
            Start Planning Your Meals Today
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold shadow-sm">
              <Sparkles size={16} className="animate-pulse" />
              Why Choose Us
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Why Choose
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Recipe Planner?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Built with modern technology and designed for real cooks who love great food
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card */}
                <div className={`
                  relative h-full bg-white rounded-2xl p-8 
                  border-2 border-gray-100
                  transition-all duration-500 ease-out
                  ${isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-lg'}
                `}>
                  
                  {/* Gradient background on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${feature.color} 
                    rounded-2xl opacity-0 group-hover:opacity-5 
                    transition-opacity duration-500
                  `}></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    {/* Icon Container */}
                    <div className="relative">
                      {/* Glow effect */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-br ${feature.color} 
                        rounded-2xl blur-xl opacity-0 group-hover:opacity-60 
                        transition-all duration-500 scale-150
                      `}></div>
                      
                      {/* Icon */}
                      <div className={`
                        relative w-20 h-20  
                        rounded-2xl flex items-center justify-center
                        transition-all duration-500 ease-out
                        ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
                        shadow-lg ${isHovered ? feature.shadowColor : 'black/10'}
                      `}>
                        <div className={`
                          absolute inset-0 bg-gradient-to-br ${feature.color} 
                          rounded-2xl opacity-0 group-hover:opacity-20 
                          transition-opacity duration-500
                        `}></div>
                        
                        <Icon 
                          size={36} 
                          className={`
                            relative z-10 transition-all duration-500
                            ${isHovered ? ' bg-gradient-to-br ' + feature.color + ' bg-clip-text scale-110' : 'text-gray-700'}
                          `}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Decorative rings */}
                      <div className={`
                        absolute inset-0 border-2 border-gray-200 rounded-2xl
                        transition-all duration-500 ease-out
                        ${isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}
                      `}></div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                      <h3 className={`
                        text-xl font-bold transition-all duration-300
                        ${isHovered ? 'text-transparent bg-gradient-to-r ' + feature.color + ' bg-clip-text' : 'text-gray-900'}
                      `}>
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div className={`
                      w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full
                      transition-all duration-500
                      ${isHovered ? 'opacity-100 w-20' : 'opacity-0 w-8'}
                    `}></div>
                  </div>

                  {/* Corner decoration */}
                  <div className={`
                    absolute top-0 right-0 w-20 h-20 
                    bg-gradient-to-br ${feature.color} 
                    opacity-0 group-hover:opacity-10 
                    rounded-bl-full rounded-tr-2xl
                    transition-all duration-500
                    transform translate-x-10 -translate-y-10 
                    group-hover:translate-x-0 group-hover:translate-y-0
                  `}></div>
                </div>

                {/* Floating particles on hover */}
                {isHovered && (
                  <>
                    <div className="absolute top-10 left-10 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-10 right-10 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping animation-delay-300"></div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center space-y-6">
          <p className="text-gray-600 text-lg">
            Join thousands of home cooks who've simplified their meal planning
          </p>
         
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(3deg); }
          66% { transform: translate(-20px, 20px) rotate(-3deg); }
        }
        
        @keyframes floatDelayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-3deg); }
          66% { transform: translate(20px, -20px) rotate(3deg); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: floatSlow 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>

      {/* Testimonials Section */}
      <>
      {/* Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full filter blur-3xl animate-float-slow"></div>
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg">
                <Star size={16} className="fill-yellow-300 text-yellow-300" />
                Loved by Thousands
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              What Our Users Say
            </h2>
            
            <p className="text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy home cooks who love Recipe Planner
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredTestimonial(index)}
                onMouseLeave={() => setHoveredTestimonial(null)}
                className="group relative"
              >
                {/* Card */}
                <div className={`
                  relative h-full bg-white rounded-2xl shadow-2xl p-8
                  transition-all duration-500 ease-out
                  ${hoveredTestimonial === index ? 'transform -translate-y-3 shadow-green-900/30' : ''}
                `}>
                  
                  {/* Quote icon decoration */}
                  <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Quote size={80} className="text-green-600" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-6">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-green-100 group-hover:ring-green-200 transition-all"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          {testimonial.badge}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={`
                            text-yellow-400 fill-yellow-400 
                            transition-all duration-300
                            ${hoveredTestimonial === index ? 'scale-110' : 'scale-100'}
                          `}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 leading-relaxed relative">
                      <span className="text-green-600 font-serif text-2xl absolute -left-2 -top-2">"</span>
                      <span className="relative z-10">{testimonial.content}</span>
                      <span className="text-green-600 font-serif text-2xl">"</span>
                    </p>
                  </div>

                  {/* Gradient border on hover */}
                  <div className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400
                    transition-opacity duration-500
                    ${hoveredTestimonial === index ? 'opacity-100' : 'opacity-0'}
                  `} style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-green-50 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes floatDelayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 12s ease-in-out infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>

      {/* Footer */}
     <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Newsletter Section */}
   

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                <ChefHat size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold">Recipe Planner</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your all-in-one solution for meal planning, recipe discovery, and smart shopping lists. 
              Making cooking enjoyable for everyone.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin, href: '#' }
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="bg-gray-800 hover:bg-green-500 p-2.5 rounded-lg transition-all hover:scale-110 hover:shadow-lg group"
                >
                  <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/search', label: 'Browse Recipes' },
                { to: '/meal-planner', label: 'Meal Planner' },
                { to: '/shopping-list', label: 'Shopping Lists' },
                { to: '/favorites', label: 'My Favorites' },
                { to: '/profile', label: 'Profile Settings' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'Help Center' },
                { to: '#', label: 'Contact Us' },
                { to: '#', label: 'Privacy Policy' },
                { to: '#', label: 'Terms of Service' },
                { to: '#', label: 'Cookie Policy' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Get in Touch
            </h3>
            <div className="space-y-4">
              {[
                { Icon: Mail, text: 'support@recipeplanner.com', href: 'mailto:support@recipeplanner.com' },
                { Icon: Phone, text: '+91 727584847', href: 'tel:+91727584847' },
                { Icon: MapPin, text: 'Gorakhpur, UP', href: '#' },
                { Icon: Github, text: 'Open Source', href: '#' }
              ].map(({ Icon, text, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
                >
                  <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-green-500 transition-colors">
                    <Icon size={16} className="text-green-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm">{text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © 2024 Recipe Planner. All rights reserved. Made with 
              <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" /> 
              for food lovers.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {['Status', 'API', 'Blog', 'Careers'].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default LandingPage;