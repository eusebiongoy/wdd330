import { searchRecipes } from './api.js';
import { displayRecipes, displayGrocery, displayPlanner } from './ui.js';

// SEARCH
document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;

    if (!query) return alert("Enter a search");

    const data = await searchRecipes(query);
    displayRecipes(data.results);
});

// CLOSE MODAL
document.addEventListener("click", (e) => {
    if (e.target.id === "modal" || e.target.id === "closeModal") {
        document.getElementById("modal").classList.add("hidden");
    }
});

// LOAD PAGE
displayPlanner();
displayGrocery();