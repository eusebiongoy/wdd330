let groceryList = JSON.parse(localStorage.getItem("grocery")) || [];

export function getItems() {
    return groceryList;
}