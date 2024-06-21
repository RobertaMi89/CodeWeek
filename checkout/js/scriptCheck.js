import { initializeCartForCheckout } from "./cartCheck.js";
import { showLoader, hideLoader, initializeLanguage } from "../../js/script.js";
import { initLogInUserModal } from "../../js/form.js";
import { toggleCart } from "../../js/cart.js";
import { saveUserInfo, loadUserInfo } from "./information.js";
// import {
//   loadTranslations,
//   setCurrentLanguage,
//   translateUI,
//   getCurrentLanguage,
// } from "../../js/language.js";

// Evento DOMContentLoaded per l'inizializzazione
let cartOpen = false; // Flag per tenere traccia dello stato del carrello

document.addEventListener("DOMContentLoaded", async () => {
  showLoader();
  initializeCartForCheckout();
  initLogInUserModal();

  try {
    toggleCart();
  } catch (error) {
    console.error(
      "Errore durante l'inizializzazione dell'applicazione:",
      error
    );
  }

  hideLoader();

  await initializeLanguage();

  loadUserInfo(); // Carica i dati utente al caricamento della pagina
});

// Event listener per il click sul pulsante "Procedi"
document.querySelector(".btns button").addEventListener("click", (e) => {
  e.preventDefault();
  saveUserInfo();
  showThankYouPage(); // Mostra la Thank You Page dopo il salvataggio dei dati
});

// Funzione per mostrare la Thank You Page
function showThankYouPage() {
  const modalThankYou = document.querySelector(".modalThankYou");
  modalThankYou.style.display = "block";

  // Event listener per il pulsante "Torna alla Home Page"
  const backButton = modalThankYou.querySelector(".backToHomeBtn");
  backButton.addEventListener("click", () => {
    modalThankYou.style.display = "none"; // Chiudi la Thank You Page
    closeCheckoutModal(); // Chiudi il checkout
    closeCart(); // Chiudi il carrello
  });
}

// Funzione per chiudere il checkout
function closeCheckoutModal() {
  const modalCheckout = document.querySelector(".modalCheckOut");
  modalCheckout.style.display = "none";
}

// Funzione per chiudere il carrello
function closeCart() {
  const cart = document.querySelector(".cartTab");
  cart.style.display = "none";
  cartOpen = false;
}

// Event listener per il pulsante del carrello
document.querySelector("#cart-icon").addEventListener("click", () => {
  const cart = document.querySelector(".cartTab");
  if (cartOpen) {
    cart.style.display = "none"; // Chiudi il carrello se è aperto
    cartOpen = false;
  } else {
    cart.style.display = "block"; // Apri il carrello se è chiuso
    cartOpen = true;
  }
});
