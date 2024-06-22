import { getCart } from "../../js/cart.js";
import { appendCartProducts } from "./cartCheck.js";
export function saveUserInfo() {
  const userInfo = {
    firstName: document.querySelector('input[name="f-name"]').value,
    lastName: document.querySelector('input[name="l-name"]').value,
    address: document.querySelector('input[name="address"]').value,
    city: document.querySelector('input[name="city"]').value,
    state: document.querySelector('input[name="state"]').value,
    zip: document.querySelector('input[name="zip"]').value,
    cardNumber: document.querySelector('input[name="card-num"]').value,
    expire: document.querySelector('input[name="expire"]').value,
    security: document.querySelector('input[name="security"]').value,
    total: getCartTotal(),
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function loadUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    document.querySelector('input[name="f-name"]').value =
      userInfo.firstName || "";
    document.querySelector('input[name="l-name"]').value =
      userInfo.lastName || "";
    document.querySelector('input[name="address"]').value =
      userInfo.address || "";
    document.querySelector('input[name="city"]').value = userInfo.city || "";
    document.querySelector('input[name="state"]').value = userInfo.state || "";
    document.querySelector('input[name="zip"]').value = userInfo.zip || "";
    document.querySelector('input[name="card-num"]').value =
      userInfo.cardNumber || "";
    document.querySelector('input[name="expire"]').value =
      userInfo.expire || "";
    document.querySelector('input[name="security"]').value =
      userInfo.security || "";

    // totale dell'ordine
    const orderTotalElement = document.querySelector(".orderTotal");
    if (orderTotalElement) {
      orderTotalElement.textContent = `€${userInfo.total.toFixed(2)}`;
    } else {
      console.error("Element .orderTotal not found in the DOM.");
    }
  } else {
    console.error("No user info found in localStorage.");
  }
}

// Mostra la thank you page con le informazioni dell'ordine
export function showThankYouPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cart = getCart();

  if (!userInfo || !cart || cart.length === 0) {
    return; //
  }

  const modalThankYou = document.querySelector(".modalThankYou");
  modalThankYou.style.display = "block";

  const orderSummary = modalThankYou.querySelector(".orderSummary");
  orderSummary.innerHTML = "";

  appendCartProducts(orderSummary, cart);

  const userInfoHTML = `
    <p><strong>Nome:</strong> ${userInfo.firstName} ${userInfo.lastName}</p>
    <p><strong>Indirizzo:</strong> ${userInfo.address}, ${userInfo.city}, ${userInfo.state}, ${userInfo.zip}</p>
    <p><strong>N. Carta Credito:</strong> ${userInfo.cardNumber}</p>
    <p><strong>Scadenza:</strong> ${userInfo.expire}</p>
    <p><strong>CCV:</strong> ${userInfo.security}</p>
  `;
  orderSummary.innerHTML += userInfoHTML;

  // Bottone per tornare alla homepage
  const backToHomeBtn = modalThankYou.querySelector(".backToHomeBtn");
  backToHomeBtn.addEventListener("click", () => {
    modalThankYou.style.display = "none";
    window.location.href = "index.html";
    localStorage.removeItem("cart");
  });
}

// click sul pulsante "Procedi"
document.querySelector(".btns button").addEventListener("click", (e) => {
  e.preventDefault();
  saveUserInfo();
});

// Carica i dati utente al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
  loadUserInfo();
});

//totale del carrello
export function getCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  return total;
}

//click sul pulsante "Procedi"
document.querySelector(".btns button").addEventListener("click", (e) => {
  e.preventDefault();
  saveUserInfo();
  loadUserInfo();
  showThankYouPage();
});
