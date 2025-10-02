import { doc, setDoc, getDoc, arrayUnion, arrayRemove, updateDoc, addDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import axios from 'axios';

// Spoonacular API configuration
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
const apiBaseUrl = 'https://api.spoonacular.com/recipes'; 
/**
 * Adds a recipe to a user's favorites list in Firestore.
 * @param {string} userId - The ID of the currently logged-in user.
 * @param {object} recipe - A simplified recipe object to save.
 */
export const addRecipeToFavorites = async (userId, recipe) => {
  if (!userId || !recipe) {
    console.error("User ID or recipe is missing.");
    return;
  }
  try {
    const favoritesRef = doc(db, 'favorites', userId);
   
    await setDoc(favoritesRef, {
      recipes: arrayUnion(recipe)
    }, { merge: true });
    console.log('Recipe added to favorites');
  } catch (error) {
    console.error("Error adding to favorites: ", error);
  }
};

/**
 * Removes a recipe from a user's favorites list.
 * @param {string} userId - The ID of the currently logged-in user.
 * @param {number} recipeId - The ID of the recipe to remove.
 */
export const removeRecipeFromFavorites = async (userId, recipeId) => {
  if (!userId || !recipeId) {
    console.error("User ID or recipe ID is missing.");
    return;
  }

  try {
    const favoritesRef = doc(db, 'favorites', userId);
    const docSnap = await getDoc(favoritesRef);

    if (docSnap.exists()) {
      const existingRecipes = docSnap.data().recipes || [];

      const updatedRecipes = existingRecipes.filter(r => String(r.id) !== String(recipeId));

      await updateDoc(favoritesRef, { recipes: updatedRecipes });
      console.log("✅ Recipe removed from favorites");
    } else {
      console.warn("No favorites found for user.");
    }
  } catch (error) {
    console.error("❌ Error removing from favorites: ", error);
  }
};

/**
 * Fetches all favorite recipes for a given user.
 * @param {string} userId - The ID of the currently logged-in user.
 * @returns {Promise<Array>} - A promise that resolves to an array of favorite recipes.
 */
export const getFavoriteRecipes = async (userId) => {
  if (!userId) return [];
  try {
    const favoritesRef = doc(db, 'favorites', userId);
    const docSnap = await getDoc(favoritesRef);
    return docSnap.exists() ? docSnap.data().recipes : [];
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    return [];
  }
};
/**
 * Fetches detailed information for multiple recipes at once using their IDs.
 * @param {Array<number>} ids - An array of recipe IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of recipe detail objects.
 */
export const getMultipleRecipeDetails = async (ids) => {
  if (!apiKey || !ids || ids.length === 0) {
    return [];
  }
  try {
    const response = await axios.get(`${apiBaseUrl}/informationBulk`, {
      params: {
        apiKey: apiKey,
        ids: ids.join(','), 
        includeNutrition: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bulk recipe details:", error);
    return [];
  }
};
// --- MEAL PLANNER FUNCTIONS (This is the missing part) ---

export const addRecipeToMealPlan = async (userId, date, mealType, recipe) => {
  if (!userId || !date || !mealType || !recipe) return;
  await addDoc(collection(db, 'mealPlan'), {
    userId,
    date,
    mealType,
    recipe
  });
};

export const getMealPlanForWeek = async (userId, startDate, endDate) => {
  if (!userId) return [];
  const mealPlan = [];
  
  // Use a simpler query that only filters by userId
  // Then filter by date range in JavaScript
  const q = query(
    collection(db, 'mealPlan'),
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Filter by date range in JavaScript to avoid need for composite index
    if (data.date >= startDate && data.date <= endDate) {
      mealPlan.push({ id: doc.id, ...data });
    }
  });
  return mealPlan;
};

export const removeRecipeFromMealPlan = async (mealPlanDocId) => {
  if (!mealPlanDocId) return;
  await deleteDoc(doc(db, 'mealPlan', mealPlanDocId));
};


