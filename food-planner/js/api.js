const SPOONACULAR_API_KEY = 'YOUR_API_KEY_HERE';

export async function searchRecipes(query) {
    if (!query) return;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPOONACULAR_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Recipes found:", data.results);
        // Here you can call a ui.js function to display recipes
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

export function searchRecipes(query) {
    console.log("Searching recipes for:", query);
}