const DEFAULT_KEY = "guest_planner";

/**
 * Get current logged-in user key
 */
function getUserKey() {
    return localStorage.getItem("user") || DEFAULT_KEY;
}

/**
 * Save planner per user
 */
export function savePlanner(data) {
    const key = getUserKey();
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Load planner per user
 */
export function loadPlanner() {
    const key = getUserKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/**
 * Login user
 */
export function loginUser(username) {
    localStorage.setItem("user", username);
}

/**
 * Logout user
 */
export function logoutUser() {
    localStorage.removeItem("user");
}

/**
 * Get current user
 */
export function getCurrentUser() {
    return localStorage.getItem("user") || null;
}