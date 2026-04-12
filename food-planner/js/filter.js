export function filterRecipes(recipes, type) {
    if (!type) return recipes;

    return recipes.filter(recipe => {
        const title = recipe.title.toLowerCase();

        if (type === "vegetarian") {
            return title.includes("veg") || title.includes("salad");
        }

        if (type === "healthy") {
            return title.includes("salad") || title.includes("chicken");
        }

        return true;
    });
}