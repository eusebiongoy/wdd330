// Entry point
import { searchRecipes } from './api.js';
import { renderPlanner } from './planner.js';
import { renderGroceryList } from './grocery.js';

document.addEventListener('DOMContentLoaded', () => {
    renderPlanner();
    renderGroceryList();

    const searchInput = document.getElementById('recipe-search');
    searchInput.addEventListener('input', (e) => {
        searchRecipes(e.target.value);
    });
});