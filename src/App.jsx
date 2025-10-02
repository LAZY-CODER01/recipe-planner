import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import HeroSection from './pages/LandingPage/HeroSection.jsx';
import AuthPage from './pages/login/signup.jsx';
import SearchResultsPage from './pages/searchResultPage.jsx';

import RecipeDetailPage from './pages/RecipeDetailPage.jsx'; 
import FavoritesPage from './pages/FavoritePage.jsx';

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
      </Routes>
    </>
  );
}

export default App;