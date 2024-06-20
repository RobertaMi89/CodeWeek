import { printAllProducts } from "./cards.js";
import { getProducts } from "./fetch.js";
import { filteredCategories, filteredPrice } from "./filter.js";
import { toggleCart, initializeCart, getCart } from "./cart.js";
import {
  loadTranslations,
  setCurrentLanguage,
  translateUI,
  getCurrentLanguage,
} from "./language.js";
import { initLogInUserModal } from "./form.js";

// Evento DOMContentLoaded per l'inizializzazione
document.addEventListener("DOMContentLoaded", async () => {
  showLoader();

  try {
    await initializeApp();
    printAllProducts();
    filteredCategories();
    filteredPrice();
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
  setupSearchFilter();
});

// Funzioni per mostrare e nascondere il loader
function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

// Funzione per inizializzare l'applicazione
async function initializeApp() {
  try {
    const products = await getProducts();
  } catch (error) {
    console.error("Errore durante il recupero dei prodotti:", error);
  }
}

// Funzione per gestire il filtro della ricerca
function setupSearchFilter() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", () => {
    const input = searchInput.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach((product) => {
      const title = product.querySelector("h3").textContent.toLowerCase();
      product.style.display = title.includes(input) ? "block" : "none";
    });
  });
}

// Funzione per inizializzare il sistema di lingua
async function initializeLanguage() {
  const languageSelect = document.getElementById("language-select");

  languageSelect.addEventListener("change", async (event) => {
    const selectedLanguage = event.target.value;
    setCurrentLanguage(selectedLanguage);
    await loadTranslations(selectedLanguage);
    translateUI(); // Aggiorna l'interfaccia con le nuove traduzioni
  });

  const currentLanguage = getCurrentLanguage();
  await loadTranslations(currentLanguage); // Carica le traduzioni iniziali
  translateUI();
}

updateCartCount();

// Funzione per aggiornare il conteggio del carrello (esempio)
function updateCartCount() {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = cartIcon.querySelector(".cart-count");
  const cart = getCart();

  if (cartCount) {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = `(${totalCount})`;
  }
}
