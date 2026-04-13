import { addToPlanner, getPlanner } from './planner.js';
import { getItems } from './grocery.js';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* 🍲 RECIPES */
export function displayRecipes(recipes) {
    const container = document.getElementById("recipes");

    container.innerHTML = "<h2>🍲 Recipes</h2>";

    recipes.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.draggable = true;

        div.innerHTML = `
            <img src="${meal.strMealThumb}" class="recipe-img">
            <h3>${meal.strMeal}</h3>
            <button class="add-btn">Add to Planner</button>
        `;

        // 🟢 DRAG START
        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("recipe", JSON.stringify({
                id: meal.idMeal,
                title: meal.strMeal,
                image: meal.strMealThumb
            }));
        });

        // ➕ ADD BUTTON
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

                            <!-- 🟢 DELETE BUTTON -->
                            <button class="delete-btn">Delete</button>
                        </div>
                        `
                        : "Drop meal here"
                }
            </div>
        `;

        const dropZone = div.querySelector(".drop-zone");

        // 🟢 DRAG OVER
        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        // 🟢 DROP
        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();

            const data = e.dataTransfer.getData("recipe");
            if (!data) return;

            const recipe = JSON.parse(data);

            addToPlanner(day, recipe);

            displayPlanner();
        });

        // 🟢 DELETE MEAL
        const deleteBtn = div.querySelector(".delete-btn");

        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
                const plannerData = getPlanner();
                delete plannerData[day];

                localStorage.setItem("planner", JSON.stringify(plannerData));

                displayPlanner();
            });
        }

        container.appendChild(div);
    });
}

/* 🟢 REPLACE MEAL */
window.replaceMeal = function(day) {
    const newName = prompt("Enter new meal name:");

    if (!newName) return;

    addToPlanner(day, {
        id: Date.now(),
        title: newName,
        image: "https://via.placeholder.com/300x200?text=Meal"
    });

    displayPlanner();
};

/* 🛒 GROCERY (UNCHANGED) */
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