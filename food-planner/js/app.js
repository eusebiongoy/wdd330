import { searchRecipes } from "./api.js";
import { renderRecipes } from "./ui.js";

const input = document.getElementById("recipe-search");

input.addEventListener("input", async (e) => {
    const query = e.target.value;

    if (query.length < 2) return;

    const recipes = await searchRecipes(query);
    renderRecipes(recipes);
});