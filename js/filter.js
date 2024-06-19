import { getCategories } from "./fetch.js";
import { createProductCard } from "./cards.js";
//FILTRO RICERCA BOTTONI

export function filteredCategories() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const category = e.target.getAttribute("data-category");
      try {
        const data = await getCategories(category);
        const productList = document.getElementById("wrapper");

        productList.innerHTML = "";

        data.forEach((product) => {
          const card = createProductCard(product);
          productList.appendChild(card);
        });
      } catch (error) {
        console.error("Errore:", error);
      }
    });
  });
}
