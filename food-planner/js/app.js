import { searchRecipes } from './api.js';
import { displayRecipes, displayGrocery, displayPlanner } from './ui.js';

document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;

    if (!query) return alert("Enter a search");

    const data = await searchRecipes(query);
    displayRecipes(data.results);
});

// LOAD UI ON START
displayPlanner();
displayGrocery();