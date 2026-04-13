let groceryList = [];

export function addItem(item) {
    groceryList.push(item);
}

export function getItems() {
    return groceryList;
}