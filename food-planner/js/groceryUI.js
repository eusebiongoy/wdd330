import { getGrocery, clearGrocery, removeFromGrocery } from "./grocery.js";

const list = document.getElementById("grocery-items");
const clearBtn = document.getElementById("clear-grocery");

// =====================
// RENDER GROCERY LIST
// =====================
export function renderGrocery() {
    const items = getGrocery();

    list.innerHTML = "";

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
// EVENTS
// =====================
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-grocery")) {
        const index = e.target.dataset.index;

        const items = getGrocery();
        removeFromGrocery(items[index]);

        renderGrocery();
    }
});

clearBtn.addEventListener("click", () => {
    clearGrocery();
    renderGrocery();
});