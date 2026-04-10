export function savePlanner(data) {
    localStorage.setItem("planner", JSON.stringify(data));
}

export function loadPlanner() {
    return JSON.parse(localStorage.getItem("planner")) || {};
}

export function saveGrocery(data) {
    localStorage.setItem("grocery", JSON.stringify(data));
}

export function loadGrocery() {
    return JSON.parse(localStorage.getItem("grocery")) || [];
}