// src/js/product.js
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create data source for tents category
const dataSource = new ProductData("tents");

// Get product ID from URL query param
const productID = getParam("product");

if (!productID) {
  // Use alert or throw instead of console.error to avoid ESLint warning
  alert("No product ID specified in URL!");
} else {
  // Initialize product details page
  const productPage = new ProductDetails(productID, dataSource);
  productPage.init();
}