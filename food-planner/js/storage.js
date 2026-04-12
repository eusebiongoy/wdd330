const DEFAULT_KEY = "guest_planner";

function getUserKey() {
    return localStorage.getItem("user") || DEFAULT_KEY;
}

// =====================
// PLANNER STORAGE
// =====================
export function savePlanner(data) {
    const key = getUserKey();
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadPlanner() {
    const key = getUserKey();
    return JSON.parse(localStorage.getItem(key));
}

// =====================
// TRELLO CARD STORAGE
// =====================
export function saveTrelloMap(map) {
    localStorage.setItem("trello_map", JSON.stringify(map));
}

export function loadTrelloMap() {
    return JSON.parse(localStorage.getItem("trello_map")) || {};
}