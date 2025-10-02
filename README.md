# 🍽️ Recipe Finder & Meal Planner

A comprehensive, modern web application for discovering recipes, planning meals, and managing your culinary journey. Built with React.js, Firebase, and the Spoonacular API.

![Recipe Planner Banner](https://via.placeholder.com/800x200/22c55e/ffffff?text=Recipe+Finder+%26+Meal+Planner)

## 🌟 Features

### 🏠 **Home & Search**
- **Smart Recipe Search**: Search through 1M+ recipes using ingredients or keywords
- **Advanced Filters**: Filter by cuisine, diet, meal type, cooking time, and health score
- **Enhanced Recipe Cards**: Detailed cards with nutrition badges, ratings, and pricing
- **Modern Landing Page**: Professional design with services, testimonials, and footer

### 📖 **Recipe Details**
- **Comprehensive Information**: Ingredients, step-by-step instructions, and nutrition facts
- **Social Sharing**: Share recipes on Facebook, Twitter, WhatsApp, and Pinterest
- **Copy Links**: Quick link copying with clipboard integration
- **Meal Planning Integration**: Add recipes directly to your meal plan
- **Favorites System**: Save recipes for quick access

### 📅 **Meal Planner**
- **Weekly Calendar View**: 7-day meal planning grid
- **Drag-and-Drop Interface**: Intuitive recipe organization with visual feedback
- **Nutritional Summaries**: Daily and weekly calorie and macro tracking
- **Export Options**: Generate PDF and CSV reports of your meal plans
- **Real-time Updates**: Instant synchronization across devices

### ❤️ **Favorites Management**
- **Recipe Collection**: Organize your favorite recipes
- **Quick Actions**: Remove recipes or add them to meal plans
- **Visual Interface**: Beautiful grid layout with hover effects

### 🛒 **Smart Shopping Lists**
- **Auto-generation**: Automatically create lists from your meal plans
- **Manual Items**: Add custom items to your shopping list
- **Progress Tracking**: Mark items as purchased with visual feedback
- **Export Options**: Print or download your shopping lists

### 👤 **Profile & Settings**
- **User Management**: Comprehensive profile editing
- **Dietary Preferences**: Set allergies and dietary restrictions
- **Theme Toggle**: Light and dark mode support
- **Privacy Controls**: Manage your data and sharing preferences

### ℹ️ **Help & Support**
- **Feature Overview**: Comprehensive guide to all features
- **FAQ Section**: Common questions and answers
- **Contact Information**: Support and feedback channels

## 🛠️ Technologies Used

### **Frontend**
- **React.js 19** - Modern functional components with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Toastify** - Professional notification system

### **Backend & Database**
- **Firebase Authentication** - Secure user authentication
- **Firebase Firestore** - Real-time NoSQL database
- **Spoonacular API** - Recipe data and nutrition information

### **State Management**
- **Zustand** - Lightweight state management
- **React Hooks** - Built-in state management

### **UI/UX Libraries**
- **@dnd-kit** - Modern drag-and-drop functionality
- **jsPDF** - PDF generation
- **React-to-Print** - Print functionality

### **Development Tools**
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Spoonacular API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/LAZY-CODER01/recipe-planner.git
   cd recipe-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Spoonacular API
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### **API Keys Setup**

#### **Spoonacular API**
1. Visit [Spoonacular API](https://spoonacular.com/food-api)
2. Create a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

#### **Firebase Setup**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Enable Firestore Database
5. Get your config keys from Project Settings
6. Add them to your `.env` file

## 📱 Usage

### **Getting Started**
1. **Sign Up/Login**: Create an account or sign in with Google
2. **Search Recipes**: Use the search bar on the home page
3. **Apply Filters**: Narrow down results by cuisine, diet, etc.
4. **View Details**: Click on any recipe card for full information
5. **Plan Meals**: Add recipes to your weekly meal planner
6. **Generate Lists**: Auto-create shopping lists from your meal plans

### **Key Features**
- **Drag & Drop**: Drag recipes between different days and meal types
- **Smart Filtering**: Find exactly what you're looking for
- **Offline Planning**: Your meal plans sync across devices
- **Export Options**: Download or print your plans and lists

## 🏗️ Project Structure

```
recipe-planner/
├── public/                 # Static assets
├── src/
│   ├── api/               # API integration (Spoonacular)
│   ├── components/        # Reusable UI components
│   ├── config/           # Firebase and utility configurations
│   ├── pages/            # Main application pages
│   ├── store/            # Zustand state management
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🎨 Design Features

### **Modern UI/UX**
- **Responsive Design**: Works perfectly on all device sizes
- **Professional Animations**: Smooth transitions and hover effects
- **Consistent Branding**: Green color scheme throughout
- **Accessible Interface**: Proper contrast and keyboard navigation

### **User Experience**
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Professional loading indicators
- **Error Handling**: Graceful error messages and recovery
- **Intuitive Navigation**: Clear, consistent navigation patterns

## 📊 Performance Features

- **Optimized Images**: Lazy loading and proper sizing
- **Efficient State Management**: Minimal re-renders
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Smart API response caching

## 🚀 Deployment

### **Vercel Deployment**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Build for Production**
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Avinash Maurya**
- GitHub: [@LAZY-CODER01](https://github.com/LAZY-CODER01)
- Email: avinashmaurya@example.com

## 🙏 Acknowledgments

- **Spoonacular API** for comprehensive recipe data
- **Firebase** for authentication and database services
- **Tailwind CSS** for the utility-first CSS framework
- **React Community** for the amazing ecosystem
- **Lucide React** for beautiful icons

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the FAQ in the app's About section
2. Open an issue on GitHub
3. Contact support at support@recipeplannerapp.com

---

## 🎯 Project Status

✅ **All Features Complete**  
✅ **Production Ready**  
✅ **Fully Responsive**  
✅ **Firebase Integrated**  
✅ **API Connected**  

**Ready for deployment and production use!**

---

*Built with ❤️ for food lovers and meal planning enthusiasts*