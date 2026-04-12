import { searchRecipes } from "./api.js";
import { renderRecipes } from "./renderRecipes.js";
import { renderPlannerUI } from "./plannerUI.js";
import { getPlanner } from "./planner.js";

import { exportToTrello } from "./planner.js";
import { generateGroceryFromPlanner } from "./grocery.js";
import { renderGrocery } from "./groceryUI.js";

// =====================
// SAFE ELEMENT CHECKS
// =====================
const input = document.getElementById("recipe-search");
const trelloBtn = document.getElementById("send-to-trello");
const groceryBtn = document.getElementById("generate-grocery");

// =====================
// SEARCH
// =====================
if (input) {
    input.addEventListener("input", async (e) => {
        const query = e.target.value;

        if (query.length < 2) return;

        const recipes = await searchRecipes(query);
        renderRecipes(recipes);
    });
}

// =====================
// INIT
// =====================
window.addEventListener("load", () => {
    renderPlannerUI();
    renderGrocery();
});

// =====================
// TRELLO SYNC (SAFE)
// =====================
if (trelloBtn) {
    trelloBtn.addEventListener("click", async () => {
        try {
            await exportToTrello();
            alert("Planner synced successfully!");
        } catch (err) {
            console.error(err);
            alert("Sync failed. Check console.");
        }
    });
}

// =====================
// GROCERY GENERATOR
// =====================
if (groceryBtn) {
    groceryBtn.addEventListener("click", () => {
        try {
            const planner = getPlanner();
            generateGroceryFromPlanner(planner);
            renderGrocery();
            alert("Grocery list generated!");
        } catch (err) {
            console.error(err);
            alert("Grocery generation failed.");
        }
    });
}