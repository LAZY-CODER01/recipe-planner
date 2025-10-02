import React, { useState } from 'react';
import { 
  Info, 
  HelpCircle, 
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
} from 'lucide-react';

// Reusable Card component for a consistent look
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md border border-slate-200/80 p-6 sm:p-8 ${className}`}>
    {children}
  </div>
);

const AboutHelpPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // --- YOUR ORIGINAL CONTENT ---
  const faqItems = [
    { id: 1, question: "How do I add recipes to my meal plan?", answer: "There are two ways to add recipes to your meal plan: 1) From any recipe detail page, click the 'Add to Meal Plan' button and select your desired date and meal type. 2) Use the drag-and-drop feature in the meal planner to move recipes between different days and meal types." },
    { id: 2, question: "How does the shopping list generation work?", answer: "The shopping list is automatically generated from all recipes in your weekly meal plan. It extracts ingredients from each recipe, combines similar items, and organizes them by category (meat, vegetables, dairy, etc.). You can also add custom items manually." },
    { id: 3, question: "Can I filter recipes by dietary restrictions?", answer: "Yes! Use the advanced search filters to find recipes that match your dietary needs. You can filter by cuisine type, diet (vegetarian, vegan, gluten-free, etc.), meal type, cooking time, and health score. Set your preferences in your profile for personalized results." },
    { id: 4, question: "How do I export my meal plan?", answer: "In the meal planner, you can export your weekly plan in two formats: PDF for printing or sharing, and CSV for use in spreadsheet applications. Both exports include your recipes and nutritional information." },
    { id: 5, question: "What nutrition information is available?", answer: "Each recipe includes detailed nutrition facts including calories, protein, carbohydrates, and fat. The meal planner shows daily and weekly nutrition summaries, helping you track your dietary goals and maintain a balanced diet." },
    { id: 6, question: "How do I share recipes with others?", answer: "On any recipe detail page, click the 'Share Recipe' button. You can share via social media (Facebook, Twitter, Pinterest, WhatsApp) or copy the direct link to share anywhere." },
    { id: 7, question: "Can I customize the app's appearance?", answer: "Yes! Go to Profile & Settings to choose between light and dark themes, set your language preference, and configure notification settings to personalize your experience." },
    { id: 8, question: "How do I set dietary preferences and allergies?", answer: "In your Profile & Settings, go to the 'Dietary Preferences' tab. Here you can specify dietary restrictions, allergies, preferred cuisines, and set daily calorie and macro goals. These preferences will be used to filter search results." }
  ];

  const features = [
    { icon: Search, title: "Smart Recipe Search", description: "Search over 1 million recipes with advanced filters for cuisine, diet, meal type, and more.", items: ["Advanced filtering", "Dietary preferences", "Cuisine types", "Cooking time filters"] },
    { icon: Calendar, title: "Meal Planning", description: "Plan your weekly meals with drag-and-drop functionality and nutrition tracking.", items: ["Weekly calendar view", "Drag-and-drop recipes", "Nutrition summaries", "PDF/CSV export"] },
    { icon: ShoppingCart, title: "Shopping Lists", description: "Auto-generate shopping lists from your meal plans with smart ingredient combining.", items: ["Auto-generation", "Manual additions", "Category organization", "Print/export options"] },
    { icon: Heart, title: "Favorites & Sharing", description: "Save favorite recipes and share them with friends and family.", items: ["Personal favorites", "Social media sharing", "Recipe links", "Copy to clipboard"] }
  ];
  // --- END OF YOUR ORIGINAL CONTENT ---

  const filteredFaqs = faqItems.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => setExpandedFaq(expandedFaq === id ? null : id);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:py-16 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            About Recipe Planner
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Your all-in-one solution for discovering recipes, planning meals, and organizing your cooking journey.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="bg-slate-200/80 rounded-lg p-1.5 flex flex-wrap justify-center gap-1">
            {[
              { id: 'about', label: 'About', icon: Info },
              { id: 'features', label: 'Features', icon: Star },
              { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md transition-colors duration-300 text-sm sm:text-base font-semibold ${
                  activeSection === tab.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-300/60 hover:text-slate-800'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- CONTENT SECTIONS --- */}
        <div className="max-w-5xl mx-auto">
          {activeSection === 'about' && (
            <div className="space-y-10 animate-fade-in-up">
              <Card>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Recipe Planner was created to simplify meal planning and make cooking more enjoyable for everyone. Whether you're a beginner cook or a culinary expert, our platform provides the tools you need to discover new recipes, plan balanced meals, and stay organized in the kitchen.
                  </p>
                  <p>
                    We believe that good food brings people together, and proper planning makes cooking stress-free and fun. Our comprehensive platform combines recipe discovery, meal planning, nutrition tracking, and shopping list management in one seamless experience.
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Discover</h3>
                  <p className="text-slate-600">Search through millions of recipes with smart filters and personalized recommendations.</p>
                </div>
                <div className="text-center">
                  <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Plan</h3>
                  <p className="text-slate-600">Create weekly meal plans with drag-and-drop ease and comprehensive nutrition tracking.</p>
                </div>
                <div className="text-center">
                  <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart size={32} className="text-violet-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Shop</h3>
                  <p className="text-slate-600">Generate smart shopping lists automatically from your meal plans.</p>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-slate-100 to-slate-200/50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Built with Modern Technology</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div><div className="font-semibold text-sky-600">React.js</div><div className="text-sm text-slate-600">Frontend Framework</div></div>
                  <div><div className="font-semibold text-emerald-600">Firebase</div><div className="text-sm text-slate-600">Backend & Auth</div></div>
                  <div><div className="font-semibold text-violet-600">Tailwind CSS</div><div className="text-sm text-slate-600">Styling</div></div>
                  <div><div className="font-semibold text-orange-600">Spoonacular API</div><div className="text-sm text-slate-600">Recipe Data</div></div>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'features' && (
             <div className="space-y-10 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center gap-4 mb-4">
                        <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                            <feature.icon size={24} className="text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                        </div>
                        <p className="text-slate-600 mb-4 flex-grow">{feature.description}</p>
                        <ul className="space-y-2">
                        {feature.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-3 text-sm text-slate-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                {item}
                            </li>
                        ))}
                        </ul>
                    </Card>
                    ))}
                </div>
                <Card>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Getting Started</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center"><div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-sky-600 font-bold">1</span></div><h4 className="font-semibold text-slate-800 mb-1">Sign Up</h4><p className="text-sm text-slate-600">Create your free account to get started</p></div>
                        <div className="text-center"><div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-emerald-600 font-bold">2</span></div><h4 className="font-semibold text-slate-800 mb-1">Set Preferences</h4><p className="text-sm text-slate-600">Configure dietary restrictions and preferences</p></div>
                        <div className="text-center"><div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-violet-600 font-bold">3</span></div><h4 className="font-semibold text-slate-800 mb-1">Find Recipes</h4><p className="text-sm text-slate-600">Search and discover amazing recipes</p></div>
                        <div className="text-center"><div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-orange-600 font-bold">4</span></div><h4 className="font-semibold text-slate-800 mb-1">Plan & Cook</h4><p className="text-sm text-slate-600">Create meal plans and start cooking</p></div>
                    </div>
                </Card>
            </div>
          )}

          {activeSection === 'help' && (
            <div className="space-y-10 animate-fade-in-up">
              <Card>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                <div className="relative mb-6">
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search for answers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
                </div>
                <div className="space-y-4">
                  {filteredFaqs.map(faq => (
                    <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button onClick={() => toggleFaq(faq.id)} className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 transition">
                        <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                        {expandedFaq === faq.id ? <ChevronDown size={20} className="text-slate-500" /> : <ChevronRight size={20} className="text-slate-500" />}
                      </button>
                      {expandedFaq === faq.id && ( <div className="px-5 pb-5 pt-2 text-slate-600 leading-relaxed"><p>{faq.answer}</p></div> )}
                    </div>
                  ))}
                   {filteredFaqs.length === 0 && <p className="text-center py-8 text-slate-500">No matching results found.</p>}
                </div>
              </Card>
              <Card>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Tips</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div><div><h4 className="font-semibold text-slate-800">Use Advanced Filters</h4><p className="text-sm text-slate-600">Save time by using cuisine, diet, and time filters when searching for recipes.</p></div></div>
                      <div className="flex gap-3"><div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div><div><h4 className="font-semibold text-slate-800">Organize Shopping</h4><p className="text-sm text-slate-600">Let the app generate your shopping list automatically from your meal plan.</p></div></div>
                      <div className="flex gap-3"><div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div><div><h4 className="font-semibold text-slate-800">Plan Your Week</h4><p className="text-sm text-slate-600">Plan all your meals at once to save time and ensure balanced nutrition.</p></div></div>
                      <div className="flex gap-3"><div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div><div><h4 className="font-semibold text-slate-800">Share Recipes</h4><p className="text-sm text-slate-600">Share your favorite recipes with friends and family on social media.</p></div></div>
                      <div className="flex gap-3"><div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div><div><h4 className="font-semibold text-slate-800">Check Nutrition</h4><p className="text-sm text-slate-600">Use the nutrition summary to track your daily and weekly intake goals.</p></div></div>
                      <div className="flex gap-3"><div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div><div><h4 className="font-semibold text-slate-800">Set Preferences</h4><p className="text-sm text-slate-600">Configure your dietary preferences for personalized recipe recommendations.</p></div></div>
                  </div>
              </Card>
            </div>
          )}

          {activeSection === 'contact' && (
             <div className="space-y-10 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Get in Touch</h2>
                        <p className="text-slate-600 mb-6 flex-grow">Have questions, suggestions, or need support? We'd love to hear from you!</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3"><Mail size={20} className="text-emerald-600" /><div><div className="font-semibold text-slate-800">Email Support</div><div className="text-slate-600">support@recipeplanner.com</div></div></div>
                            <div className="flex items-center gap-3"><Github size={20} className="text-slate-700" /><div><div className="font-semibold text-slate-800">GitHub</div><div className="text-slate-600">github.com/recipeplanner</div></div></div>
                            <div className="flex items-center gap-3"><Users size={20} className="text-sky-600" /><div><div className="font-semibold text-slate-800">Community</div><div className="text-slate-600">Join our cooking community</div></div></div>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Name</label><input type="text" placeholder="Your name" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" /></div>
                            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Email</label><input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" /></div>
                            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label><select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"><option>General Question</option><option>Technical Support</option><option>Feature Request</option><option>Bug Report</option><option>Feedback</option></select></div>
                            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Message</label><textarea rows={4} placeholder="Tell us how we can help..." className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"></textarea></div>
                            <button type="submit" className="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors duration-300">Send Message</button>
                        </form>
                    </Card>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-sky-600 rounded-xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Thank You for Using Recipe Planner!</h2>
                    <p className="opacity-90">We're constantly working to improve your cooking and meal planning experience. Your feedback helps us make the app better for everyone.</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutHelpPage;