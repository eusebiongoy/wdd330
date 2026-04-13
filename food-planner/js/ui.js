import { addToPlanner, getPlanner } from './planner.js';
import { getRecipeDetails } from './api.js';
import { addIngredients, getItems } from './grocery.js';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 🟢 RECIPES
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
            const day = prompt("Enter day (Mon-Sun)");

            addToPlanner(day, recipe);

            const details = await getRecipeDetails(recipe.id);
            addIngredients(details.extendedIngredients);

            displayPlanner();
            displayGrocery();
        });

        container.appendChild(div);
    });
}

// 🟢 PLANNER (NEW)
export function displayPlanner() {
    const container = document.getElementById("planner");
    const planner = getPlanner();

    container.innerHTML = "<h2>📅 Weekly Planner</h2>";

    days.forEach(day => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${day}</h3>
            <p>${planner[day]?.title || "No meal planned"}</p>
        `;

        container.appendChild(div);
    });
}

// 🟢 GROCERY
export function displayGrocery() {
    const container = document.getElementById("grocery");
    const items = getItems();

    container.innerHTML = `
        <h2>🛒 Grocery List</h2>
        <button id="addItemBtn">+ Add Item</button>
    `;

    // ADD ITEM BUTTON
    document.getElementById("addItemBtn").addEventListener("click", () => {
        const item = prompt("Enter item name");
        if (item) {
            items.push(item);
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        }
    });

    items.forEach((item, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            ${item}
            <button data-index="${index}">❌</button>
        `;

        // REMOVE BUTTON
        div.querySelector("button").addEventListener("click", () => {
            items.splice(index, 1);
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        });

        container.appendChild(div);
    });
}