// productDetails.mjs

import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  // Initialize product details
  async init() {
    try {
      // Fetch product data from the data source
      this.product = await this.dataSource.findProductById(this.productId);

      // Render product details in the DOM
      this.renderProductDetails();

      // Add "Add to Cart" event listener
      const addBtn = document.getElementById("addToCart");
      if (addBtn) {
        addBtn.addEventListener("click", this.addProductToCart.bind(this));
      }
    } catch (error) {
      console.error("Error initializing product details:", error);
    }
  }

  // Add product to local storage cart
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    console.log(`${this.product.NameWithoutBrand} added to cart.`);
  }

  // Render product details in the DOM
  renderProductDetails() {
    const product = this.product;
    if (!product) return;

    document.querySelector("h2").textContent = product.Brand?.Name || "Unknown Brand";
    document.querySelector("h3").textContent = product.NameWithoutBrand || "";
    
    const productImage = document.getElementById("productImage");
    if (productImage) {
      productImage.src = product.Image || "";
      productImage.alt = product.NameWithoutBrand || "";
    }

    document.getElementById("productPrice").textContent = product.FinalPrice || "";
    document.getElementById("productColor").textContent = product.Colors?.[0]?.ColorName || "";
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple || "";

    const addBtn = document.getElementById("addToCart");
    if (addBtn) addBtn.dataset.id = product.Id || "";
  }
}