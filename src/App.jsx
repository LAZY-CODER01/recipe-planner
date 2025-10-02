import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar.jsx';
import HeroSection from './pages/LandingPage/HeroSection.jsx';
import AuthPage from './pages/login/signup.jsx';
import SearchResultsPage from './pages/searchResultPage.jsx';

import RecipeDetailPage from './pages/RecipeDetailPage.jsx'; 
import FavoritesPage from './pages/FavoritePage.jsx';
import MealPlannerPage from './pages/MealPlanner.jsx';
import ShoppingListPage from './pages/ShoppingListPage.jsx';
import ProfileSettingsPage from './pages/ProfileSettingsPage.jsx';
import AboutHelpPage from './pages/AboutHelpPage.jsx';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
    
        <Route path="/login" element={<AuthPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/meal-planner' element={<MealPlannerPage />} />
        <Route path='/shopping-list' element={<ShoppingListPage />} />
        <Route path='/profile' element={<ProfileSettingsPage />} />
        <Route path='/about' element={<AboutHelpPage />} />
      </Routes>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
    </>
  );
}

export default App;