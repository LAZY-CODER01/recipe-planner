import React, { useState } from 'react';
import { 
  Info, 
  HelpCircle, 
  Book, 
  Users, 
  Mail, 
  Github, 
  Star,
  ChevronDown,
  ChevronRight,
  Search,
  Heart,
  Calendar,
  ShoppingCart,
  Settings
} from 'lucide-react';

const AboutHelpPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "How do I add recipes to my meal plan?",
      answer: "There are two ways to add recipes to your meal plan: 1) From any recipe detail page, click the 'Add to Meal Plan' button and select your desired date and meal type. 2) Use the drag-and-drop feature in the meal planner to move recipes between different days and meal types."
    },
    {
      id: 2,
      question: "How does the shopping list generation work?",
      answer: "The shopping list is automatically generated from all recipes in your weekly meal plan. It extracts ingredients from each recipe, combines similar items, and organizes them by category (meat, vegetables, dairy, etc.). You can also add custom items manually."
    },
    {
      id: 3,
      question: "Can I filter recipes by dietary restrictions?",
      answer: "Yes! Use the advanced search filters to find recipes that match your dietary needs. You can filter by cuisine type, diet (vegetarian, vegan, gluten-free, etc.), meal type, cooking time, and health score. Set your preferences in your profile for personalized results."
    },
    {
      id: 4,
      question: "How do I export my meal plan?",
      answer: "In the meal planner, you can export your weekly plan in two formats: PDF for printing or sharing, and CSV for use in spreadsheet applications. Both exports include your recipes and nutritional information."
    },
    {
      id: 5,
      question: "What nutrition information is available?",
      answer: "Each recipe includes detailed nutrition facts including calories, protein, carbohydrates, and fat. The meal planner shows daily and weekly nutrition summaries, helping you track your dietary goals and maintain a balanced diet."
    },
    {
      id: 6,
      question: "How do I share recipes with others?",
      answer: "On any recipe detail page, click the 'Share Recipe' button. You can share via social media (Facebook, Twitter, Pinterest, WhatsApp) or copy the direct link to share anywhere."
    },
    {
      id: 7,
      question: "Can I customize the app's appearance?",
      answer: "Yes! Go to Profile & Settings to choose between light and dark themes, set your language preference, and configure notification settings to personalize your experience."
    },
    {
      id: 8,
      question: "How do I set dietary preferences and allergies?",
      answer: "In your Profile & Settings, go to the 'Dietary Preferences' tab. Here you can specify dietary restrictions, allergies, preferred cuisines, and set daily calorie and macro goals. These preferences will be used to filter search results."
    }
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Recipe Search",
      description: "Search over 1 million recipes with advanced filters for cuisine, diet, meal type, and more.",
      items: ["Advanced filtering", "Dietary preferences", "Cuisine types", "Cooking time filters"]
    },
    {
      icon: Calendar,
      title: "Meal Planning",
      description: "Plan your weekly meals with drag-and-drop functionality and nutrition tracking.",
      items: ["Weekly calendar view", "Drag-and-drop recipes", "Nutrition summaries", "PDF/CSV export"]
    },
    {
      icon: ShoppingCart,
      title: "Shopping Lists",
      description: "Auto-generate shopping lists from your meal plans with smart ingredient combining.",
      items: ["Auto-generation", "Manual additions", "Category organization", "Print/export options"]
    },
    {
      icon: Heart,
      title: "Favorites & Sharing",
      description: "Save favorite recipes and share them with friends and family.",
      items: ["Personal favorites", "Social media sharing", "Recipe links", "Copy to clipboard"]
    }
  ];

  const filteredFaqs = faqItems.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-playfair mb-4">About Recipe Planner</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your all-in-one solution for discovering recipes, planning meals, and organizing your cooking journey.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          {[
            { id: 'about', label: 'About', icon: Info },
            { id: 'features', label: 'Features', icon: Star },
            { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
            { id: 'contact', label: 'Contact', icon: Mail }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors ${
                  activeSection === tab.id
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Recipe Planner was created to simplify meal planning and make cooking more enjoyable for everyone. 
              Whether you're a beginner cook or a culinary expert, our platform provides the tools you need to 
              discover new recipes, plan balanced meals, and stay organized in the kitchen.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe that good food brings people together, and proper planning makes cooking stress-free and fun. 
              Our comprehensive platform combines recipe discovery, meal planning, nutrition tracking, and shopping 
              list management in one seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-gray-600">Search through millions of recipes with smart filters and personalized recommendations.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan</h3>
              <p className="text-gray-600">Create weekly meal plans with drag-and-drop ease and comprehensive nutrition tracking.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shop</h3>
              <p className="text-gray-600">Generate smart shopping lists automatically from your meal plans.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Built with Modern Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-semibold text-blue-600">React.js</div>
                <div className="text-sm text-gray-600">Frontend Framework</div>
              </div>
              <div>
                <div className="font-semibold text-green-600">Firebase</div>
                <div className="text-sm text-gray-600">Backend & Auth</div>
              </div>
              <div>
                <div className="font-semibold text-purple-600">Tailwind CSS</div>
                <div className="text-sm text-gray-600">Styling</div>
              </div>
              <div>
                <div className="font-semibold text-orange-600">Spoonacular API</div>
                <div className="text-sm text-gray-600">Recipe Data</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      {activeSection === 'features' && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Sign Up</h4>
                <p className="text-sm text-gray-600">Create your free account to get started</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Set Preferences</h4>
                <p className="text-sm text-gray-600">Configure dietary restrictions and preferences</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Find Recipes</h4>
                <p className="text-sm text-gray-600">Search and discover amazing recipes</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Plan & Cook</h4>
                <p className="text-sm text-gray-600">Create meal plans and start cooking</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      {activeSection === 'help' && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            {/* Search FAQ */}
            <div className="mb-6">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                    {expandedFaq === faq.id ? (
                      <ChevronDown size={20} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No FAQ items found matching your search.
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Quick Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Use Advanced Filters</h4>
                    <p className="text-sm text-gray-600">Save time by using cuisine, diet, and time filters when searching for recipes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Plan Your Week</h4>
                    <p className="text-sm text-gray-600">Plan all your meals at once to save time and ensure balanced nutrition.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Check Nutrition</h4>
                    <p className="text-sm text-gray-600">Use the nutrition summary to track your daily and weekly intake goals.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Organize Shopping</h4>
                    <p className="text-sm text-gray-600">Let the app generate your shopping list automatically from your meal plan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Share Recipes</h4>
                    <p className="text-sm text-gray-600">Share your favorite recipes with friends and family on social media.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Set Preferences</h4>
                    <p className="text-sm text-gray-600">Configure your dietary preferences for personalized recipe recommendations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions, suggestions, or need support? We'd love to hear from you!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-green-600" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-gray-600">support@recipeplanner.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Github size={20} className="text-gray-700" />
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-gray-600">github.com/recipeplanner</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Community</div>
                    <div className="text-gray-600">Join our cooking community</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                    <option>General Question</option>
                    <option>Technical Support</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Thank You for Using Recipe Planner!</h2>
            <p className="text-lg opacity-90">
              We're constantly working to improve your cooking and meal planning experience. 
              Your feedback helps us make the app better for everyone.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutHelpPage;
