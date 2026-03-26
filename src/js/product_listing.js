// Product List page
if (document.getElementById("productListContainer")) {
  const products = window.ExternalServicesSource.getAllProducts();
  const list = new ProductList(products);
  list.render("productListContainer");
}