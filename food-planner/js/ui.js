import { addToGrocery } from "./grocery.js";
import { addToPlanner } from "./planner.js";

export function renderRecipes(recipes) {
    const container = document.getElementById("recipe-results");

    if (!container) return; // safety check

    container.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" width="100%">
            <div class="buttons">
                <button class="plan">➕ Add to Planner</button>
                <button class="shop">🛒 Add to Grocery</button>
            </div>
        `;

        // Add to Planner
        card.querySelector(".plan").addEventListener("click", () => {
            const day = prompt("Enter day (Monday - Sunday)");

            if (!day) return;

            const formattedDay = day.toLowerCase().trim();

            addToPlanner(formattedDay, recipe);

            alert(`Added "${recipe.title}" to ${formattedDay}`);
        });

        // Add to Grocery
        card.querySelector(".shop").addEventListener("click", () => {
            addToGrocery(recipe.title);
            alert(`Added "${recipe.title}" to grocery list`);
        });

        container.appendChild(card);
    });
}