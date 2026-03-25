// main.js
import ProductList from './js/ProductList.js';
import ProductData from './js/ProductData.js'; // your data source module

// Grab the HTML element where products will be displayed
const tentsContainer = document.getElementById('tentsList');

// Create an instance of ProductList
const tentsList = new ProductList('tents', ProductData, tentsContainer);

// Initialize the list to fetch and render products
tentsList.init();