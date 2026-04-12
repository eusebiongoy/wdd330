// =====================
// STORAGE KEY
// =====================
const GROCERY_KEY = "grocery";

// =====================
// LOAD GROCERY
// =====================
export function loadGrocery() {
    try {
        const data = localStorage.getItem(GROCERY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading grocery:", error);
        return [];
    }
}

// =====================
// SAVE GROCERY
// =====================
export function saveGrocery(grocery) {
    try {
        localStorage.setItem(GROCERY_KEY, JSON.stringify(grocery));
    } catch (error) {
        console.error("Error saving grocery:", error);
    }
}