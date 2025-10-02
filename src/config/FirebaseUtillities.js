import { doc, setDoc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; 
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
