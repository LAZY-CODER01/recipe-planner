import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import { getRecipeDetails } from '../api/spoonacular'; 
import { addRecipeToFavorites, addRecipeToMealPlan } from '../config/FirebaseUtillities'; 
import { Heart, Calendar, Share2, Copy, Facebook, Twitter, Instagram, Link2, Check } from 'lucide-react';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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

  const handleAddToMealPlan = () => {
    if (!currentUser) {
      alert("Please log in to add recipes to your meal plan.");
      navigate('/login');
      return;
    }
    setShowMealPlanModal(true);
  };

  const handleMealPlanSubmit = async () => {
    if (!recipe || !currentUser || !selectedDate) return;

    const recipeToSave = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    };

    try {
      await addRecipeToMealPlan(currentUser.uid, selectedDate, selectedMealType, recipeToSave);
      alert(`${recipe.title} was added to your ${selectedMealType} on ${selectedDate}!`);
      setShowMealPlanModal(false);
    } catch (error) {
      console.error('Error adding to meal plan:', error);
      alert('Error adding to meal plan. Please try again.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // Sharing functionality
  const currentUrl = window.location.href;
  const shareText = `Check out this amazing recipe: ${recipe?.title || 'Delicious Recipe'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleSocialShare = (platform) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(shareText);
    let shareUrl;

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      case 'pinterest':
        const encodedImage = encodeURIComponent(recipe?.image || '');
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedText}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
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
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleAddToFavorites}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                <Heart size={20} />
                Add to Favorites
              </button>
              <button
                onClick={handleAddToMealPlan}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <Calendar size={20} />
                Add to Meal Plan
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <Share2 size={20} />
                Share Recipe
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-700 mb-6 prose" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-500 pb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2 mt-4">
                {recipe.extendedIngredients.map((ing) => (
                  <li key={ing.id}>{ing.original}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-500 pb-2">Instructions</h2>
              <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>

            {/* Nutrition Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-500 pb-2">Nutrition</h2>
              {recipe.nutrition ? (
                <div className="mt-4 space-y-3">
                  {recipe.nutrition.nutrients && recipe.nutrition.nutrients.slice(0, 8).map((nutrient) => (
                    <div key={nutrient.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium text-gray-700">{nutrient.name}</span>
                      <span className="text-green-600 font-semibold">
                        {Math.round(nutrient.amount)}{nutrient.unit}
                      </span>
                    </div>
                  ))}
                  
                  {/* Recipe Stats */}
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">Recipe Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ready in:</span>
                        <span className="font-medium">{recipe.readyInMinutes} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Servings:</span>
                        <span className="font-medium">{recipe.servings}</span>
                      </div>
                      {recipe.healthScore && (
                        <div className="flex justify-between">
                          <span>Health Score:</span>
                          <span className="font-medium text-green-600">{recipe.healthScore}/100</span>
                        </div>
                      )}
                      {recipe.pricePerServing && (
                        <div className="flex justify-between">
                          <span>Price per serving:</span>
                          <span className="font-medium">${(recipe.pricePerServing / 100).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-center">Nutrition information not available for this recipe.</p>
                  
                  {/* Basic Recipe Stats */}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ready in:</span>
                      <span className="font-medium">{recipe.readyInMinutes} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Servings:</span>
                      <span className="font-medium">{recipe.servings}</span>
                    </div>
                    {recipe.healthScore && (
                      <div className="flex justify-between">
                        <span>Health Score:</span>
                        <span className="font-medium text-green-600">{recipe.healthScore}/100</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Meal Plan Modal */}
      {showMealPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Add to Meal Plan</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal Type:
              </label>
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleMealPlanSubmit}
                disabled={!selectedDate}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add to Plan
              </button>
              <button
                onClick={() => setShowMealPlanModal(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Share Recipe</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            {/* Copy Link */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                    linkCopied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                  {linkCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Share on Social Media
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={18} />
                  Facebook
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center gap-2 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Twitter size={18} />
                  Twitter
                </button>
                
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                  </svg>
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleSocialShare('pinterest')}
                  className="flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.69-2.436-2.878-2.436-4.632 0-3.78 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                  Pinterest
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;