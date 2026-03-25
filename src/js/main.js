// src/js/main.js
import ProductList from './ProductList.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getLocalStorage, setLocalStorage, getParam } from './utils.mjs';

// Example usage:

// 1. Product Details page
const productId = getParam("id"); // get product id from URL
if (productId) {
  const details = new ProductDetails(productId, window.ProductDataSource);
  details.init();
}

// 2. Product List page
if (document.getElementById("productListContainer")) {
  const products = window.ProductDataSource.getAllProducts();
  const list = new ProductList(products);
  list.render("productListContainer");
}