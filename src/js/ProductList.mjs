// src/js/ProductList.mjs
export default class ProductList {
  constructor(products) {
    this.products = products;
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    this.products.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <h3>${product.NameWithoutBrand}</h3>
        <p>${product.FinalPrice}</p>
      `;
      container.appendChild(div);
    });
  }
}