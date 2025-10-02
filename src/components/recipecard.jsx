import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart, Star, ChefHat } from 'lucide-react';

export const RecipeCard = ({ recipe }) => {
  const createMarkup = (htmlString) => {
    return { __html: htmlString.slice(0, 100) + '...' }; 
  };

  // Helper function to format cooking time
  const formatTime = (minutes) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-full hover:shadow-xl">
        <div className="relative">
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
          
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {recipe.vegetarian && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Vegetarian
              </span>
            )}
            {recipe.vegan && (
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Vegan
              </span>
            )}
            {recipe.glutenFree && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Gluten Free
              </span>
            )}
          </div>

          {/* Health Score */}
          {recipe.healthScore && (
            <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
              <div className="flex items-center">
                <Heart size={14} className="text-red-500 mr-1" />
                <span className="text-xs font-semibold">{recipe.healthScore}</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {recipe.title}
          </h3>
          
          {/* Recipe Stats */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{formatTime(recipe.readyInMinutes)}</span>
            </div>
            
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>{recipe.servings || 'N/A'} servings</span>
            </div>
            
            {recipe.spoonacularScore && (
              <div className="flex items-center">
                <Star size={14} className="mr-1 text-yellow-500" />
                <span>{Math.round(recipe.spoonacularScore / 20)}/5</span>
              </div>
            )}
          </div>

          {/* Cuisine types */}
          {recipe.cuisines && recipe.cuisines.length > 0 && (
            <div className="flex items-center mb-2">
              <ChefHat size={14} className="mr-1 text-gray-500" />
              <span className="text-xs text-gray-600">
                {recipe.cuisines.slice(0, 2).join(', ')}
              </span>
            </div>
          )}

          {/* Description */}
          {recipe.summary ? (
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={createMarkup(recipe.summary)}
            />
          ) : (
            <p className="text-sm text-gray-600">Delicious recipe ready to cook!</p>
          )}

          {/* Price per serving */}
          {recipe.pricePerServing && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-green-600">
                ${(recipe.pricePerServing / 100).toFixed(2)} per serving
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};