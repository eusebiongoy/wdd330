import {
    getPlanner,
    subscribe,
    removeFromPlanner,
    moveMeal
} from "./planner.js";

const container = document.getElementById("planner-grid");

// =====================
// RENDER PLANNER
// =====================
export function renderPlannerUI() {
    render(getPlanner());
}

// CORE RENDER
function render(planner) {
    if (!container) return;

    container.innerHTML = "";

    Object.keys(planner).forEach(day => {
        const box = document.createElement("div");
        box.classList.add("day-box");

        const meals = planner[day];

        box.innerHTML = `
            <h3>${day.toUpperCase()}</h3>
            <div class="meals">
                ${meals.length
                    ? meals.map((m, index) => `
                        <div class="meal-item"
                             draggable="true"
                             data-day="${day}"
                             data-index="${index}">
                            🍽 ${m.title}
                            <span class="remove"
                                  data-day="${day}"
                                  data-index="${index}">❌</span>
                        </div>
                    `).join("")
                    : "<p class='empty'>No meals</p>"
                }
            </div>
        `;

        // DROP TARGET
        box.addEventListener("dragover", (e) => {
            e.preventDefault();
            box.classList.add("drag-over");
        });

        box.addEventListener("dragleave", () => {
            box.classList.remove("drag-over");
        });

        box.addEventListener("drop", (e) => {
            box.classList.remove("drag-over");

            const fromDay = e.dataTransfer.getData("day");
            const index = e.dataTransfer.getData("index");

            moveMeal(fromDay, day, index);
        });

        container.appendChild(box);
    });

    enableDragAndRemove();
}

// =====================
// DRAG HANDLING
// =====================
function enableDragAndRemove() {
    document.querySelectorAll(".meal-item").forEach(item => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("day", item.dataset.day);
            e.dataTransfer.setData("index", item.dataset.index);

            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    });

    // REMOVE BUTTON
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFromPlanner(btn.dataset.day, btn.dataset.index);
        });
    });
}

// =====================
// LIVE UPDATE
// =====================
subscribe(render);