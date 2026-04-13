export function displayRecipes(recipes) {
    const container = document.getElementById("recipes");
    container.innerHTML = "";

    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" width="100%">
        `;
        container.appendChild(div);
    });
}