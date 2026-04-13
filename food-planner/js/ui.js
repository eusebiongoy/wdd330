import { addToPlanner, getPlanner } from './planner.js';
import { getRecipeDetails } from './api.js';
import { getItems } from './grocery.js';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 🍲 DISPLAY RECIPES
export function displayRecipes(recipes) {
    const container = document.getElementById("recipes");
    container.innerHTML = "<h2>🍲 Recipes</h2>";

    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("draggable", true);

        div.innerHTML = `
            <img src="${recipe.image}" class="recipe-img">
            <h3>${recipe.title}</h3>
            <button class="add-btn">Add to Planner</button>
        `;

        // DRAG START
        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("recipe", JSON.stringify(recipe));
        });

        // BUTTON CLICK
        div.querySelector(".add-btn").addEventListener("click", () => {
            const day = prompt("Enter day (Mon-Sun)");
            addToPlanner(day, recipe);
            displayPlanner();
        });

        // MODAL CLICK
        div.addEventListener("click", async (e) => {
            if (e.target.tagName === "BUTTON") return;

            const modal = document.getElementById("modal");
            const modalBody = document.getElementById("modalBody");

            const details = await getRecipeDetails(recipe.id);

            modalBody.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" width="100%">
                <h3>Ingredients:</h3>
                <ul>
                    ${details.extendedIngredients.map(i => `<li>${i.name}</li>`).join("")}
                </ul>
            `;

            modal.classList.remove("hidden");
        });

        container.appendChild(div);
    });
}

// 📅 DISPLAY PLANNER
export function displayPlanner() {
    const container = document.getElementById("planner");
    const planner = getPlanner();

    container.innerHTML = "<h2>📅 Weekly Planner</h2>";

    days.forEach(day => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${day}</h3>
            <div class="drop-zone">
                ${planner[day] ? `<div class="meal">${planner[day].title}</div>` : "Drop meal here"}
            </div>
        `;

        const dropZone = div.querySelector(".drop-zone");

        // ALLOW DROP
        dropZone.addEventListener("dragover", e => e.preventDefault());

        // DROP EVENT
        dropZone.addEventListener("drop", (e) => {
            const recipe = JSON.parse(e.dataTransfer.getData("recipe"));
            addToPlanner(day, recipe);
            displayPlanner();
        });

        container.appendChild(div);
    });
}

// 🛒 DISPLAY GROCERY
export function displayGrocery() {
    const container = document.getElementById("grocery");
    let items = getItems();

    container.innerHTML = `
        <h2>🛒 Grocery List</h2>
        <button id="addItemBtn">+ Add Item</button>
    `;

    // ADD ITEM
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

        div.innerHTML = `
            <input type="checkbox" ${item.checked ? "checked" : ""}>
            <span style="${item.checked ? "text-decoration: line-through" : ""}">
                ${item.name}
            </span>
            <button>❌</button>
        `;

        // CHECK
        div.querySelector("input").addEventListener("change", () => {
            items[index].checked = !items[index].checked;
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        });

        // DELETE
        div.querySelector("button").addEventListener("click", () => {
            items.splice(index, 1);
            localStorage.setItem("grocery", JSON.stringify(items));
            displayGrocery();
        });

        container.appendChild(div);
    });
}