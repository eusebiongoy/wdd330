import { searchRecipes } from './api.js';
import { displayRecipes, displayGrocery } from './ui.js';

document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Please enter a search term");
        return;
    }

    const data = await searchRecipes(query);
    displayRecipes(data.results);
});

// Load grocery list on start
displayGrocery();