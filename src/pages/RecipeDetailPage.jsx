import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import { getRecipeDetails } from '../api/spoonacular'; 
import { addRecipeToFavorites } from '../config/FirebaseUtillities'; 
import { Heart } from 'lucide-react';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const details = await getRecipeDetails(id);
      setRecipe(details);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    if (!recipe) return;

    if (currentUser) {
    
      const recipeToSave = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      };
      addRecipeToFavorites(currentUser.uid, recipeToSave);
      alert(`${recipe.title} was added to your favorites!`);
    } else {
    
      alert("Please log in to save recipes to your favorites.");
      navigate('/login');
    }
  };

  if (loading) return <p className="text-center p-12">Loading Recipe...</p>;
  if (!recipe) return <p className="text-center p-12">Could not load recipe details.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 sm:h-96 object-cover" />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-3xl font-bold font-playfair mb-2 sm:mb-0">{recipe.title}</h1>
            <button
              onClick={handleAddToFavorites}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              <Heart size={20} />
              Add to Favorites
            </button>
          </div>

          <div className="text-sm text-gray-700 mb-6 prose" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-500 pb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2 mt-4">
                {recipe.extendedIngredients.map((ing) => (
                  <li key={ing.id}>{ing.original}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-500 pb-2">Instructions</h2>
              <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;