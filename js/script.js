import { printAllProducts } from "./cards.js";
import { getProducts } from "./fetch.js";
import { filteredCategories } from "./filter.js";
import { toggleCart } from "./cart.js";

window.addEventListener("DOMContentLoaded", async () => {
  showLoader();
  await initializeApp();
  printAllProducts();
  filteredCategories();
  hideLoader();
  toggleCart();
});

async function initializeApp() {
  try {
    const products = await getProducts();
    console.log(products);
  } catch (error) {
    console.error("Errore durante il recupero dei prodotti:", error);
  }
}

// Funzioni per mostrare e nascondere il loader
function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

//filtro dentro il campo input
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const input = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(input) ? "block" : "none";
  });
});
