import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export const RecipeCard = ({ recipe }) => {

  const createMarkup = (htmlString) => {
    return { __html: htmlString.slice(0, 100) + '...' }; 
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{recipe.title}</h3>
          {recipe.summary ? (
            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={createMarkup(recipe.summary)}
            />
          ) : (
            <p className="text-sm text-gray-600">No description available.</p>
          )}
        </div>
      </div>
    </Link>
  );
};