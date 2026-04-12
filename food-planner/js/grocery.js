const STORAGE_KEY = "grocery";

// =====================
// LOAD GROCERY
// =====================
export function loadGrocery() {
    const data = localStorage.getItem(STORAGE_KEY);

    try {
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to load grocery:", error);
        return [];
    }
}

// =====================
// SAVE GROCERY
// =====================
export function saveGrocery(grocery) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(grocery));
    } catch (error) {
        console.error("Failed to save grocery:", error);
    }
}