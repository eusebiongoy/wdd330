// Product List page
if (document.getElementById("productListContainer")) {
  const products = window.ProductDataSource.getAllProducts();
  const list = new ProductList(products);
  list.render("productListContainer");
}