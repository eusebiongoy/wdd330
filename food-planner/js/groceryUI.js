import {
    getGrocery,
    clearGrocery,
    removeFromGrocery
} from "./grocery.js";

const list = document.getElementById("grocery-items");
const clearBtn = document.getElementById("clear-grocery");

// =====================
// RENDER LIST
// =====================
export function renderGrocery() {
    if (!list) return;

    const items = getGrocery();
    list.innerHTML = "";

    if (items.length === 0) {
        list.innerHTML = "<p>No items in grocery list</p>";
        return;
    }

    items.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            🛒 ${item}
            <span class="remove-grocery" data-index="${index}">❌</span>
        `;

        list.appendChild(li);
    });
}

// =====================
// CLICK EVENTS
// =====================
if (list) {
    list.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-grocery")) {
            const index = e.target.dataset.index;
            const items = getGrocery();

            removeFromGrocery(items[index]);
            renderGrocery();
        }
    });
}

// =====================
// CLEAR BUTTON
// =====================
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        clearGrocery();
        renderGrocery();
    });
}