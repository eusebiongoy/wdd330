import { CONFIG } from '../config/config.js';

export async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${CONFIG.API_KEY}`;

    const response = await fetch(url);
    return response.json();
}