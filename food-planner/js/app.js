import { searchRecipes } from "./api.js";
import { renderRecipes } from "./renderRecipes.js";
import { renderPlannerUI } from "./plannerUI.js";
import { exportToTrello } from "./planner.js";

// =====================
// RECIPE SEARCH
// =====================
const input = document.getElementById("recipe-search");

input.addEventListener("input", async (e) => {
    const query = e.target.value;

    if (query.length < 2) return;

    const recipes = await searchRecipes(query);
    renderRecipes(recipes);
});

// =====================
// INIT APP
// =====================
window.addEventListener("load", () => {
    renderPlannerUI();
});

// =====================
// TRELLO BUTTON (NO LINK)
// =====================
const trelloBtn = document.getElementById("send-to-trello");

if (trelloBtn) {
    trelloBtn.addEventListener("click", async () => {
        await exportToTrello();
        alert("Planner sent to Trello!");
    });
}