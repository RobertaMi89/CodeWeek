const apiUrl = "https://fakestoreapi.com";
const products = `${apiUrl}/products`;
const categories = `${products}/category`;
const prices = `${products}/price`;

let objGlobalFetch = {
  products: null,
  categories: {},
  prices: [],
};

export async function getProducts() {
  try {
    const response = await fetch(`${products}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Errore durante il recupero dei prodotti: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}
console.log(getProducts());

export async function getCategories(category) {
  if (objGlobalFetch[category]) {
    return objGlobalFetch[category];
  } else {
    try {
      const response = await fetch(`${categories}${category}`);
      if (response.ok) {
        const textResponse = await response.text();
        try {
          const data = JSON.parse(textResponse);
          objGlobalFetch[category] = data;
          return data;
        } catch (jsonError) {
          throw new Error(
            `Errore durante il parsing della risposta JSON: ${jsonError}`
          );
        }
      } else {
        throw new Error(
          `Errore durante il recupero della categoria: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Errore:", error);
      throw error;
    }
  }
}

export async function getPrices() {
  if (objGlobalFetch.prices.length > 0) {
    return objGlobalFetch.prices;
  } else {
    try {
      const response = await fetch(`${products}`);
      if (response.ok) {
        const data = await response.json();
        const uniquePrices = [...new Set(data.map((product) => product.price))];
        objGlobalFetch.prices = uniquePrices;
        return uniquePrices;
      } else {
        throw new Error(
          `Errore durante il recupero dei prezzi: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Errore durante il recupero dei prezzi:", error);
      throw error;
    }
  }
}
