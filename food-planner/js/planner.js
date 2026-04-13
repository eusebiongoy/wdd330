let planner = {};

export function addToPlanner(day, recipe) {
    planner[day] = recipe;
}

export function getPlanner() {
    return planner;
}