export function filterByCategory(recipes, category) {
    return recipes.filter(r => r.category === category);
}