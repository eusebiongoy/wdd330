import { savePlanner, loadPlanner } from "./storage.js";

let planner = loadPlanner();

export function addToPlanner(day, recipe) {
    if (!planner[day]) planner[day] = [];

    planner[day].push(recipe.title);
    savePlanner(planner);
}

export function getPlanner() {
    return planner;
}