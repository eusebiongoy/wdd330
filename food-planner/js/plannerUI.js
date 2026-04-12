import {
    getPlanner,
    subscribe,
    removeFromPlanner,
    moveMeal
} from "./planner.js";

const container = document.getElementById("planner-grid");

// RENDER UI
export function renderPlannerUI() {
    render(getPlanner());
}

// CORE RENDER
function render(planner) {
    if (!container) return;

    container.innerHTML = "";

    const days = Object.keys(planner);

    days.forEach(day => {
        const box = document.createElement("div");
        box.classList.add("day-box");

        const meals = planner[day];

        box.innerHTML = `
            <h3>${day.toUpperCase()}</h3>
            <div class="meals">
                ${meals.length
                    ? meals.map((m, index) => `
                        <p class="meal-item"
                           draggable="true"
                           data-day="${day}"
                           data-index="${index}">
                            🍽 ${m.title}
                            <span class="remove"
                                  data-day="${day}"
                                  data-index="${index}">❌</span>
                        </p>
                    `).join("")
                    : "<p>No meals</p>"
                }
            </div>
        `;

        // DRAG & DROP
        box.addEventListener("dragover", e => e.preventDefault());

        box.addEventListener("drop", (e) => {
            const fromDay = e.dataTransfer.getData("day");
            const index = e.dataTransfer.getData("index");

            moveMeal(fromDay, day, index);
        });

        container.appendChild(box);
    });

    enableDrag();
}

// ENABLE DRAG
function enableDrag() {
    document.querySelectorAll(".meal-item").forEach(item => {
        item.addEventListener("dragstart", e => {
            e.dataTransfer.setData("day", item.dataset.day);
            e.dataTransfer.setData("index", item.dataset.index);
        });
    });

    // REMOVE BUTTON
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFromPlanner(btn.dataset.day, btn.dataset.index);
        });
    });
}

// LIVE UPDATE
subscribe(render);