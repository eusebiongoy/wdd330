// js/ProductList.js

// Template function for a single product card
function productCardTemplate(product) {
  return `
    <div class="product-card">
      <img src="${product.imageUrl || ''}" alt="${product.name}" class="product-card__image" />
      <div class="product-card__details">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__description">${product.description || ''}</p>
        <p class="product-card__color">Color: ${product.color || 'N/A'}</p>
        <span class="product-card__price">$${product.price.toFixed(2)}</span>
        <button class="product-card__add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;       // e.g., "tents" or "sleeping-bags"
    this.dataSource = dataSource;   // object or function that provides product data
    this.listElement = listElement; // HTML element where products will be displayed
    this.products = [];             // store products internally
  }

  // Initialize the product list, allowing async data fetching
  async init() {
    try {
      // Assume dataSource has a getData() method that returns a promise
      this.products = await this.dataSource.getData(this.category);
      this.render(); // display the products once fetched
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Render products into the target HTML element
  render() {
    if (!this.listElement) return;

    // Clear previous content
    this.listElement.innerHTML = '';

    // Render each product using the template function
    this.products.forEach(product => {
      this.listElement.innerHTML += productCardTemplate(product);
    });
  }
}