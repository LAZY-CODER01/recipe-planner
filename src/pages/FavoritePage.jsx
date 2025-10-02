import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getFavoriteRecipes, removeRecipeFromFavorites } from '../config/FirebaseUtillities';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const RecipeCard = ({ recipe }) => (
  <Link to={`/recipe/${recipe.id}`} className="block group">
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-full">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate">{recipe.title}</h3>
      </div>
    </div>
  </Link>
);

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
       
        fetchFavorites(user.uid);
      } else {
        
        setFavorites([]);
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const fetchFavorites = async (uid) => {
    setLoading(true);
    const favs = await getFavoriteRecipes(uid);
    setFavorites(favs);
    setLoading(false);
  };

  const handleRemove = async (recipeToRemove) => {
    if (!currentUser) return;
    await removeRecipeFromFavorites(currentUser.uid, recipeToRemove.id);
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== recipeToRemove.id));
  };

  if (loading) {
    return <p className="text-center p-12 text-lg">Loading Your Favorite Recipes...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold font-playfair mb-8">My Favorite Recipes</h1>
      
      {!currentUser ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-600">Please <Link to="/login" className="text-green-600 underline font-semibold">log in</Link> to see your saved recipes.</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-600">You haven't saved any recipes yet. Start exploring!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="relative group">
              <RecipeCard recipe={recipe} />
              <button
                onClick={() => handleRemove(recipe)}
                title="Remove from favorites"
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 focus:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

