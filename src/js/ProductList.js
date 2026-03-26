// src/js/ProductList.mjs
export default class ProductList {
  constructor(products) {
    this.products = products;
  }

  async render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    this.products.forEach(async (product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <h3>${product.NameWithoutBrand}</h3>
        <p>${product.FinalPrice}</p>
      `;

      const list = await this.dataSource.getData(this.category);
      container.appendChild(div);
    });
  }
}