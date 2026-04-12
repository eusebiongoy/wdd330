import { searchRecipes } from "./api.js";
import { renderRecipes } from "./renderRecipes.js";
import { renderPlannerUI } from "./plannerUI.js";
import { getPlanner } from "./planner.js";

import { sendPlannerToTrello } from "./trello.js";
import { generateGroceryFromPlanner } from "./grocery.js";
import { renderGrocery } from "./groceryUI.js";

// =====================
// SAFE ELEMENTS
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
// INIT UI
// =====================
window.addEventListener("load", () => {
    renderPlannerUI();
    renderGrocery();
});

// =====================
// TRELLO BUTTON
// =====================
if (trelloBtn) {
    trelloBtn.addEventListener("click", async () => {
        try {
            const planner = getPlanner();
            await sendPlannerToTrello(planner);
            alert("✔ Sent to Trello");
        } catch (err) {
            console.error(err);
            alert("❌ Trello failed (check console)");
        }
    });
} else {
    console.warn("Trello button NOT found in HTML");
}

// =====================
// GROCERY BUTTON
// =====================
if (groceryBtn) {
    groceryBtn.addEventListener("click", () => {
        try {
            const planner = getPlanner();
            generateGroceryFromPlanner(planner);
            renderGrocery();
            alert("✔ Grocery generated");
        } catch (err) {
            console.error(err);
            alert("❌ Grocery failed");
        }
    });
} else {
    console.warn("Grocery button NOT found in HTML");
}