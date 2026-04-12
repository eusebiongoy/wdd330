import { loadGrocery, saveGrocery } from "./storage.js";

let grocery = loadGrocery();

export function addToGrocery(item) {
    grocery.push(item);
    saveGrocery(grocery);
}

export function getGrocery() {
    return grocery;
}