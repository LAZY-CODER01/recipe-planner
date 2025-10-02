import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchRecipes } from '../api/spoonacular'; 
import { RecipeCard } from '../components/recipecard'; 

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError('');
        const results = await searchRecipes(query);
        if (results && results.length > 0) {
          setRecipes(results);
        } else {
          setRecipes([]);
          setError(`No recipes found for "${query}". Please try another search term.`);
        }
        setLoading(false);
      };

      fetchSearchResults();
    } else {
    
      setError('Please enter a search term on the home page to see results.');
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div className="text-center p-12 text-lg font-semibold">Searching for "{query}"...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-8">
        Search Results for: <span className="text-green-600">"{query}"</span>
      </h1>

      {error && (
        <div className="text-center py-10 bg-red-50 p-6 rounded-lg">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <Link to="/" className="bg-green-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-600 transition-colors">
                Back to Home
            </Link>
        </div>
      )}
      
      {recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;