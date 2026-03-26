import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// Listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
  e.preventDefault();

  const myForm = document.forms[0]; // assumes checkout form is the first form
  const isValid = myForm.checkValidity();
  myForm.reportValidity();
  if (!isValid) return; // stop if HTML5 validation fails

  try {
    const result = await myCheckout.checkout();

    if (result?.error) {
      // handle error from checkout
      alertMessage(`Checkout failed: ${result.message}`);
    } else {
      // success path
      localStorage.removeItem("so-cart"); // clear the cart
      window.location.href = "./success.html"; // redirect to success page
    }
  } catch (err) {
    // unexpected errors
    alertMessage(`Unexpected error: ${err.message || err}`);
  }
});

// Previously commented submit listener remains for reference
// document.forms['checkout']
// .addEventListener('submit', (e) => {
//   e.preventDefault();
//   myCheckout.checkout();
// });