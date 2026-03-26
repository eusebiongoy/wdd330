// src/js/product.js
import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Create data source for tents category
const dataSource = new ExternalServices("tents");

const productID = getParam("product");


const product = new ProductDetails(productID, dataSource);
product.init();