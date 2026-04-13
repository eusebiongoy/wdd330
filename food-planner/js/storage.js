export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData() {
    console.log("Data loaded");
}