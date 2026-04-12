import { savePlanner, loadPlanner } from "./storage.js";
import { sendPlannerToTrello } from "./trello.js";

let planner = loadPlanner() || {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
};

const listeners = [];
let syncTimeout = null;

// =====================
// SUBSCRIBE UI
// =====================
export function subscribe(callback) {
    listeners.push(callback);
}

function notify() {
    listeners.forEach(fn => fn(planner));
}

// =====================
// SAVE + SYNC (DEBOUNCED)
// =====================
function update() {
    savePlanner(planner);
    notify();

    // 🔥 debounce Trello sync
    if (syncTimeout) clearTimeout(syncTimeout);

    syncTimeout = setTimeout(() => {
        syncToTrello();
    }, 2000); // wait 2 seconds after last change
}

// =====================
// SYNC FUNCTION
// =====================
async function syncToTrello() {
    try {
        await sendPlannerToTrello(planner);
        console.log("Trello synced ✔");
    } catch (err) {
        console.error("Trello sync failed:", err);
    }
}

// =====================
// ADD MEAL
// =====================
export function addToPlanner(day, recipe) {
    if (!planner[day]) planner[day] = [];

    planner[day].push({
        title: recipe.title
    });

    update();
}

// =====================
// REMOVE MEAL
// =====================
export function removeFromPlanner(day, index) {
    if (planner[day]) {
        planner[day].splice(index, 1);
        update();
    }
}

// =====================
// MOVE MEAL
// =====================
export function moveMeal(fromDay, toDay, index) {
    if (!planner[fromDay] || !planner[toDay]) return;

    const meal = planner[fromDay].splice(index, 1)[0];
    planner[toDay].push(meal);

    update();
}

// =====================
// GET DATA
// =====================
export function getPlanner() {
    return planner;
}