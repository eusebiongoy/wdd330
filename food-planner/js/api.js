import { CONFIG } from '../config/config.js';

// Search recipes
export async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${CONFIG.API_KEY}`;

    const response = await fetch(url);
    return response.json();
}

// Get recipe details (ingredients)
export async function getRecipeDetails(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${CONFIG.API_KEY}`;

    const response = await fetch(url);
    return response.json();
}