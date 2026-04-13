import { searchRecipes } from './api.js';
import { displayRecipes } from './ui.js';
import { loadData } from './storage.js';

document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;

    const data = await searchRecipes(query);
    displayRecipes(data.results);
});

loadData();