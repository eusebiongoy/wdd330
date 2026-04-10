const API_KEY = "YOUR_API_KEY";

export async function searchRecipes(query) {
    const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${API_KEY}`
    );

    const data = await res.json();
    return data.results || [];
}