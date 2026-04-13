export async function searchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        results: data.meals || []
    };
}

export async function getRecipeDetails(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.meals ? data.meals[0] : null;
}