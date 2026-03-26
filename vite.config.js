import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Project source folder
  root: "src/",

  build: {
    // Output folder relative to root
    outDir: "../dist",

    // Multiple HTML entry points
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        products: resolve(__dirname, "src/product_listing/index.html")
      },
    },
  },
});