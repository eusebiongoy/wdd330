// renderRecipes.js

export function renderRecipes(recipes) {
    const container = document.getElementById("recipe-results");
    container.innerHTML = "";  // Clear any existing content

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" width="100%">
            <button class="plan">Add to Planner</button>
            <button class="shop">Add to Grocery</button>
        `;

        // Add to Planner
        card.querySelector(".plan").addEventListener("click", () => {
            const day = prompt("Enter day (monday-sunday)");
            if (day) addToPlanner(day.toLowerCase(), recipe);
        });

        // Add to Grocery
        card.querySelector(".shop").addEventListener("click", () => {
            addToGrocery(recipe.title);
        });

        container.appendChild(card);
    });
}