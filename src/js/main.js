// main.js
import { ProductList } from './ProductList.mjs';
import { ProductDetails } from './ProductDetails.mjs';
import { utils } from './utils.mjs';

// Grab the HTML element where products will be displayed
const tentsContainer = document.getElementById('tentsList');

// Create an instance of ProductList
const tentsList = new ProductList('tents', ProductData, tentsContainer);

// Initialize the list to fetch and render products
tentsList.init();