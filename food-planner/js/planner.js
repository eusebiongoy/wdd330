let planner = JSON.parse(localStorage.getItem("planner")) || {};

export function addToPlanner(day, recipe) {
    planner[day] = recipe;
    localStorage.setItem("planner", JSON.stringify(planner));
}

export function getPlanner() {
    return planner;
}