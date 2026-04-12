import { loadGrocery, saveGrocery } from "./storage.js";

let grocery = loadGrocery() || [];

/**
 * Add item to grocery (no duplicates)
 */
export function addToGrocery(item) {
    if (!item) return;

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
 * Remove item
 */
export function removeFromGrocery(item) {
    grocery = grocery.filter(i => i !== item);
    saveGrocery(grocery);
}

/**
 * Clear list
 */
export function clearGrocery() {
    grocery = [];
    saveGrocery(grocery);
}

/**
 * Generate grocery list from planner
 */
export function generateGroceryFromPlanner(planner) {
    let items = [];

    for (let day in planner) {
        planner[day].forEach(meal => {
            items.push(meal.title);
        });
    }

    grocery = [...new Set(items)];
    saveGrocery(grocery);
}