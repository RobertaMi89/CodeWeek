import { printAllProducts } from "./cards.js";
import { getProducts } from "./fetch.js";

window.addEventListener("DOMContentLoaded", () => {
  printAllProducts();
  initializeApp();
});
async function initializeApp() {
  try {
    const products = await getProducts();
    console.log(products);
  } catch (error) {
    console.error("Errore durante il recupero dei prodotti:", error);
  }
}
