import { loadGrocery, saveGrocery } from "./storage.js";

let grocery = loadGrocery() || [];

// =====================
// ADD ITEM
// =====================
export function addToGrocery(item) {
    if (!item) return;

    if (!grocery.includes(item)) {
        grocery.push(item);
        saveGrocery(grocery);
    }
}

// =====================
// GET LIST
// =====================
export function getGrocery() {
    return grocery;
}

// =====================
// REMOVE ITEM
// =====================
export function removeFromGrocery(item) {
    grocery = grocery.filter(i => i !== item);
    saveGrocery(grocery);
}

// =====================
// CLEAR LIST
// =====================
export function clearGrocery() {
    grocery = [];
    saveGrocery(grocery);
}

// =====================
// GENERATE FROM PLANNER (SAFE)
// =====================
export function generateGroceryFromPlanner(planner) {
    let items = [];

    for (let day in planner) {
        if (!planner[day]) continue;

        planner[day].forEach(meal => {
            if (meal && meal.title) {
                items.push(meal.title);
            }
        });
    }

    grocery = [...new Set(items)];
    saveGrocery(grocery);
}