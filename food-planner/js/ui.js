import { addToPlanner } from './planner.js';
import { getRecipeDetails } from './api.js';
import { addIngredients, getItems } from './grocery.js';

export function displayRecipes(recipes) {
    const container = document.getElementById("recipes");
    container.innerHTML = "<h2>🍲 Recipes</h2>";

    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${recipe.image}" class="recipe-img">
            <h3>${recipe.title}</h3>
            <button class="add-btn">Add to Planner</button>
        `;

        div.querySelector(".add-btn").addEventListener("click", async () => {
            const day = prompt("Enter day (Mon, Tue, Wed...)");

            // Add to planner
            addToPlanner(day, recipe);

            // Get ingredients from API
            const details = await getRecipeDetails(recipe.id);

            // Add ingredients to grocery list
            addIngredients(details.extendedIngredients);

            alert("✅ Added to planner + grocery list!");
            displayGrocery();
        });

        container.appendChild(div);
    });
}

export function displayGrocery() {
    const container = document.getElementById("grocery");
    const items = getItems();

    container.innerHTML = "<h2>🛒 Grocery List</h2>";

    items.forEach(item => {
        const p = document.createElement("p");
        p.textContent = "✔ " + item;
        container.appendChild(p);
    });
}