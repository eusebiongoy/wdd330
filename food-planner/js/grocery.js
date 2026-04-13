let groceryList = JSON.parse(localStorage.getItem("grocery")) || [];

export function addIngredients(ingredients) {
    ingredients.forEach(item => {
        groceryList.push(item.name);
    });

    localStorage.setItem("grocery", JSON.stringify(groceryList));
}

export function getItems() {
    return groceryList;
}