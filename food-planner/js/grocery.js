import { loadGrocery, saveGrocery } from "./storage.js";

// Load or start empty list safely
let grocery = loadGrocery() || [];

/**
 * Add item to grocery list (no duplicates)
 */
export function addToGrocery(item) {
    if (!item) return;

    // prevent duplicates
    if (!grocery.includes(item)) {
        grocery.push(item);
        saveGrocery(grocery);
    }
}

/**
 * Get grocery list
 */
export function getGrocery() {
    return grocery;
}

/**
 * Remove item from grocery list
 */
export function removeFromGrocery(item) {
    grocery = grocery.filter(i => i !== item);
    saveGrocery(grocery);
}

/**
 * Clear entire grocery list
 */
export function clearGrocery() {
    grocery = [];
    saveGrocery(grocery);
}

/**
 * Auto-generate grocery list from planner meals
 * (we will connect this in next step)
 */
export function generateFromPlanner(planner) {
    const items = [];

    for (let day in planner) {
        planner[day].forEach(meal => {
            items.push(meal.title);
        });
    }

    // merge without duplicates
    grocery = [...new Set(items)];
    saveGrocery(grocery);
}