import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    price: parseFloat(item.FinalPrice) || 0,
    name: item.Name,
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      `${this.outputSelector} #cartTotal`
    );
    const itemNumElement = document.querySelector(
      `${this.outputSelector} #num-items`
    );

    if (itemNumElement) {
      itemNumElement.innerText = this.list.length;
    }

    const amounts = this.list.map(
      (item) => parseFloat(item.FinalPrice) || 0
    );

    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    this.shipping =
      this.list.length > 0
        ? 10 + (this.list.length - 1) * 2
        : 0;

    this.orderTotal =
      this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxEl = document.querySelector(
      `${this.outputSelector} #tax`
    );
    const shippingEl = document.querySelector(
      `${this.outputSelector} #shipping`
    );
    const totalEl = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );

    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingEl)
      shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalEl)
      totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    if (!this.list.length) {
      console.error("Cart is empty");
      return;
    }

    const formElement = document.forms["checkout"];
    if (!formElement) {
      console.error("Checkout form not found");
      return;
    }

    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log("Checkout successful:", response);
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  }
}