// src/js/product.js
import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create data source for tents category
const dataSource = new ExternalServices("tents");

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