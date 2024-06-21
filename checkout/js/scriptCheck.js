import { initializeCart } from "./cartCheck.js";
import { showLoader, hideLoader, initializeLanguage } from "../../js/script.js";

// import {
//   loadTranslations,
//   setCurrentLanguage,
//   translateUI,
//   getCurrentLanguage,
// } from "../../js/language.js";

// Evento DOMContentLoaded per l'inizializzazione
document.addEventListener("DOMContentLoaded", async () => {
  showLoader();

  try {
    toggleCart();
  } catch (error) {
    console.error(
      "Errore durante l'inizializzazione dell'applicazione:",
      error
    );
  }

  hideLoader();

  await initializeLanguage(); // Inizializza il sistema di lingua
  initializeCart();
});
