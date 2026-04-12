import { searchRecipes } from "./api.js";
import { renderRecipes } from "./renderRecipes.js";
import { renderPlannerUI } from "./plannerUI.js";
import { getPlanner } from "./planner.js";

import { exportToTrello } from "./planner.js";
import { generateGroceryFromPlanner } from "./grocery.js";
import { renderGrocery } from "./groceryUI.js";

// =====================
// RECIPE SEARCH
// =====================
const input = document.getElementById("recipe-search");

if (input) {
    input.addEventListener("input", async (e) => {
        const query = e.target.value;

        if (query.length < 2) return;

        const recipes = await searchRecipes(query);
        renderRecipes(recipes);
    });
}

// =====================
// INIT APP
// =====================
window.addEventListener("load", () => {
    renderPlannerUI();
    renderGrocery();
});

// =====================
// TRELLO SYNC BUTTON
// =====================
const trelloBtn = document.getElementById("send-to-trello");

if (trelloBtn) {
    trelloBtn.addEventListener("click", async () => {
        await exportToTrello();
        alert("Planner sent to Trello!");
    });
}

// =====================
// GROCERY GENERATOR BUTTON
// =====================
const groceryBtn = document.getElementById("generate-grocery");

if (groceryBtn) {
    groceryBtn.addEventListener("click", () => {
        const planner = getPlanner();
        generateGroceryFromPlanner(planner);

        renderGrocery(); // 🔥 update UI instantly
        alert("Grocery list generated!");
    });
}