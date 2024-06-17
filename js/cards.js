import { getProducts } from "./fetch.js";

export async function printAllProducts() {
  const productList = document.getElementById("wrapper");

  try {
    if (!productList) {
      throw new Error("Elemento 'productList' non trovato nel DOM.");
    }

    const products = await getProducts();
    productList.innerHTML = "";

    products.forEach((product) => {
      if (!product || typeof product !== "object") {
        console.error("Dati prodotto non validi:", product);
        return;
      }

      const card = createProductCard(product);
      productList.appendChild(card);
    });
  } catch (error) {
    console.error("Errore durante il recupero dei prodotti:", error);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("product-img");
  card.appendChild(imgContainer);

  const img = document.createElement("img");
  img.src = product.image;
  imgContainer.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("product-info");
  card.appendChild(info);

  const text = document.createElement("div");
  text.classList.add("product-text");
  info.appendChild(text);

  const title = document.createElement("h3");
  title.textContent = product.title || "Titolo non disponibile";
  text.appendChild(title);

  const rating = document.createElement("p");
  rating.textContent = product.rating.rate || "rate non disponibile";
  text.appendChild(rating);

  const description = document.createElement("p");
  description.textContent =
    product.description || "Descrizione non disponibile";
  text.appendChild(description);

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("product-price-btn");
  card.appendChild(btnDiv);

  const priceP = document.createElement("p");
  priceP.textContent = `$`;
  btnDiv.appendChild(priceP);

  const priceSpan = document.createElement("span");
  priceSpan.textContent = product.price || "N/D";
  priceP.appendChild(priceSpan);

  const btn = document.createElement("button");
  btn.type = "button";
  btnDiv.appendChild(btn);

  return card;
}
