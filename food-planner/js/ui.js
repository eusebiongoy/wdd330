import { addToPlanner, getPlanner } from './planner.js';
import { getRecipeDetails } from './api.js';
import { getItems } from './grocery.js';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* 🍲 RECIPES */
export function displayRecipes(recipes) {
    const container = document.getElementById("recipes");

    container.innerHTML = "<h2>🍲 Recipes</h2>";

    recipes.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${meal.strMealThumb}" class="recipe-img">
            <h3>${meal.strMeal}</h3>
            <button class="add-btn">Add to Planner</button>
        `;

        // ADD TO PLANNER
        div.querySelector(".add-btn").addEventListener("click", () => {
            const day = prompt("Enter day (Mon-Sun)");
            if (!day) return;

            addToPlanner(day, {
                id: meal.idMeal,
                title: meal.strMeal,
                image: meal.strMealThumb
            });

            displayPlanner();
        });

        container.appendChild(div);
    });
}

/* 📅 PLANNER */
export function displayPlanner() {
    const container = document.getElementById("planner");
    const planner = getPlanner();

    container.innerHTML = "<h2>📅 Weekly Planner</h2>";

    days.forEach(day => {
        const meal = planner[day];

        const div = document.createElement("div");
        div.classList.add("planner-card");

        div.innerHTML = `
            <h3>${day}</h3>
            <div class="drop-zone">
                ${
                    meal
                        ? `
                        <div class="meal">
                            <img src="${meal.image}" class="planner-img">
                            <p>${meal.title}</p>
                        </div>
                        `
                        : "Drop meal here"
                }
            </div>
        `;

        const dropZone = div.querySelector(".drop-zone");

        dropZone.addEventListener("dragover", e => e.preventDefault());

        dropZone.addEventListener("drop", (e) => {
            const recipe = JSON.parse(e.dataTransfer.getData("recipe"));
            addToPlanner(day, recipe);
            displayPlanner();
        });

        container.appendChild(div);
    });
}

/* 🛒 GROCERY */
export function displayGrocery() {
    const container = document.getElementById("grocery");
    let items = getItems();

    container.innerHTML = `
        <h2>🛒 Grocery List</h2>
        <button id="addItemBtn">+ Add Item</button>
    `;

    document.getElementById("addItemBtn").addEventListener("click", () => {
        const item = prompt("Enter item");
        if (item) {
            items.push({ name: item, checked: false });
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        }
    });

    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("grocery-item");

        div.innerHTML = `
            <input type="checkbox" ${item.checked ? "checked" : ""}>
            <span class="${item.checked ? "checked" : ""}">
                ${item.name}
            </span>
            <button>❌</button>
        `;

        div.querySelector("input").addEventListener("change", () => {
            items[index].checked = !items[index].checked;
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        });

        div.querySelector("button").addEventListener("click", () => {
            items.splice(index, 1);
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        });

        container.appendChild(div);
    });
}