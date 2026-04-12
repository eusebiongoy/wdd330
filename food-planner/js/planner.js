import { savePlanner, loadPlanner } from "./storage.js";
import { sendPlannerToTrello } from "./trello.js";

// Load or create safe structure
let planner = loadPlanner() || {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
};

// UI listeners
const listeners = [];

export function subscribe(callback) {
    listeners.push(callback);
}

// notify UI
function notify() {
    listeners.forEach(fn => fn(planner));
}

// save + update UI
function update() {
    savePlanner(planner);
    notify();
}

/**
 * Add meal to planner
 */
export function addToPlanner(day, recipe) {
    if (!planner[day]) planner[day] = [];

    planner[day].push({
        title: recipe.title
    });

    update();
}

/**
 * Remove meal
 */
export function removeFromPlanner(day, index) {
    if (planner[day]) {
        planner[day].splice(index, 1);
        update();
    }
}

/**
 * Move meal (drag & drop)
 */
export function moveMeal(fromDay, toDay, index) {
    if (!planner[fromDay] || !planner[toDay]) return;

    const meal = planner[fromDay].splice(index, 1)[0];
    planner[toDay].push(meal);

    update();
}

/**
 * Get planner data
 */
export function getPlanner() {
    return planner;
}

/**
 * CLEAR planner
 */
export function clearPlanner() {
    planner = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    };

    update();
}

/**
 * SEND TO TRELLO (manual trigger button)
 */
export async function exportToTrello() {
    await sendPlannerToTrello(planner);
    alert("Planner sent to Trello!");
}