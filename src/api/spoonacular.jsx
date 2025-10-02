import axios from 'axios';

// Get the API key from environment variables
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
const apiBaseUrl = 'https://api.spoonacular.com/recipes';

/**
 * Searches for recipes based on a query.
 * @param {string} query - The search term (e.g., "pasta", "chicken").
 * @returns {Promise<Array>} A promise that resolves to an array of recipes.
 */
export const searchRecipes = async (query) => {
  if (!apiKey) {
    console.error("API key is missing.");
    return [];
  }
  try {
    const response = await axios.get(`${apiBaseUrl}/complexSearch`, {
      params: {
        apiKey: apiKey,
        query: query,
        number: 12, // Fetch 12 results
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

/**
 * Fetches detailed information for a specific recipe by its ID.
 * @param {string} id - The ID of the recipe.
 * @returns {Promise<Object|null>} A promise that resolves to the recipe details object or null.
 */
export const getRecipeDetails = async (id) => {
  if (!apiKey) {
    console.error("API key is missing.");
    return null;
  }
  try {
    const response = await axios.get(`${apiBaseUrl}/${id}/information`, {
      params: {
        apiKey: apiKey,
        includeNutrition: true, // Get nutrition data
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};
