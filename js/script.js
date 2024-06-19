import { printAllProducts } from "./cards.js";
import { getProducts } from "./fetch.js";
import { filteredCategories } from "./filter.js";
import { toggleCart, initializeCart, getCart } from "./cart.js";
import {
  loadTranslations,
  setCurrentLanguage,
  translate,
  getCurrentLanguage,
  getCurrentTranslations,
} from "./language.js";

// Evento DOMContentLoaded per l'inizializzazione
document.addEventListener("DOMContentLoaded", async () => {
  showLoader();

  try {
    await initializeApp();
    printAllProducts();
    filteredCategories();
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

// Funzione per tradurre l'interfaccia utente
function translateUI() {
  const translations = getCurrentTranslations();

  // Esempio di traduzione di un elemento specifico
  const promoElement = document.getElementById("promo");
  if (promoElement) {
    promoElement.textContent = translations["promo"];
  }

  // Esempio di traduzione di altri elementi
  const cartMenuElement = document.querySelector(".cart h2");
  if (cartMenuElement) {
    cartMenuElement.textContent = translations["shopping_cart"];
  }

  // Traduzione dell'elemento "Totale" nel carrello
  const cartTotalElement = document.querySelector(".cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = translations["total"];
  }

  // Traduzione dei nomi delle categorie nella sidebar
  const sidebar = document.querySelector(".sidebar");
  const categoryButtons = sidebar.querySelectorAll(".filter-button");
  categoryButtons.forEach((button) => {
    const category = button.getAttribute("data-category").replace("/", "");
    button.textContent = translations["categories"][category];
  });

  // Esempio di aggiornamento del conteggio nel carrello
  updateCartCount();
}

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
