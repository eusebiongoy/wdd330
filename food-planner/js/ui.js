import { addToGrocery } from "./grocery.js";
import { addToPlanner } from "./planner.js";

export function renderRecipes(recipes) {
    const container = document.getElementById("recipe-results");
    container.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" width="100%">
            <button class="plan">Add to Planner</button>
            <button class="shop">Add to Grocery</button>
        `;

        card.querySelector(".plan").addEventListener("click", () => {
            const day = prompt("Enter day (monday-sunday)");
            if (day) addToPlanner(day.toLowerCase(), recipe);
        });

        card.querySelector(".shop").addEventListener("click", () => {
            addToGrocery(recipe.title);
        });

        container.appendChild(card);
    });
}