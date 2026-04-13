import { searchRecipes } from './api.js';
import { displayRecipes, displayPlanner, displayGrocery } from './ui.js';

// 🔍 SEARCH BUTTON
document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Please enter a recipe name");
        return;
    }

    const data = await searchRecipes(query);

    displayRecipes(data.results);
});

// LOAD DATA ON START
displayPlanner();
displayGrocery();