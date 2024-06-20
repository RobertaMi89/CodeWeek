import { getCategories, getProducts } from "./fetch.js";
import { createProductCard } from "./cards.js";

async function buildProductsCard(category = null, order = null) {
  try {
    let data;
    if (category) {
      data = await getCategories(category);
    } else {
      data = await getProducts();
    }

    // Ordina i prodotti filtrati in base al prezzo
    if (order === "asc") {
      data.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      data.sort((a, b) => b.price - a.price);
    }

    const productList = document.getElementById("wrapper");
    productList.innerHTML = "";

    data.forEach((product) => {
      const card = createProductCard(product);
      productList.appendChild(card);
    });
  } catch (error) {
    console.error("Errore:", error);
  }
}

// FILTRO RICERCA PER CATEGORIA
export function filteredCategories() {
  const selectElement = document.getElementById("category-select");

  selectElement.addEventListener("change", async (e) => {
    const category = e.target.value;
    buildProductsCard(category, document.getElementById("price-select").value);
  });
}

// FILTRO RICERCA PREZZO
export function filteredPrice() {
  const selectElement = document.getElementById("price-select");

  selectElement.addEventListener("change", async (e) => {
    const order = e.target.value; // "asc" per crescente, "desc" per decrescente
    buildProductsCard(document.getElementById("category-select").value, order);
  });
}
