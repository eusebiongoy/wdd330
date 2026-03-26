// ShoppingCart.mjs

export default class ShoppingCart {
  constructor(container, cart = []) {
    this.container = container;
    this.cart = cart;
  }

  // Template for a single cart item
  cartItemTemplate(item) {
    return `
      <div class="cart-item">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${item.price * item.quantity}</p>
      </div>
    `;
  }

  // Template for the whole cart
  cartTemplate() {
    if (this.cart.length === 0) {
      return `<p>Your cart is empty.</p>`;
    }

    return `
      <div class="shopping-cart">
        ${this.cart.map(item => this.cartItemTemplate(item)).join("")}
        <hr />
        <h2>Total: $${this.calculateTotal()}</h2>
      </div>
    `;
  }

  // Calculate total price
  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Render cart to DOM
  render() {
    this.container.innerHTML = this.cartTemplate();
  }

  // Optional: add item
  addItem(item) {
    const existing = this.cart.find(p => p.id === item.id);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }

    this.render();
  }

  // Optional: remove item
  removeItem(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.render();
  }
}