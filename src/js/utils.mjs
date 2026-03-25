// utils.mjs - helper functions for DOM, localStorage, and URL params

// shorthand for querySelector
export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localStorage
export const getLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// save data to localStorage
export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// get query parameter from URL
export const getParam = (name) => {
  return new URLSearchParams(window.location.search).get(name);
};

// add click/touchend listener
export const setClick = (selector, callback) => {
  const element = qs(selector);
  if (!element) return;

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  element.addEventListener("click", callback);
};