const apiUrl = "https://fakestoreapi.com";
const products = `${apiUrl}/products`;
const categories = `${products}/category`;

let objGlobalFetch = {};

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

export async function getCategories(category) {
  if (objGlobalFetch[category]) {
    return objGlobalFetch[category];
  } else {
    try {
      const response = await fetch(`${categories}${category}`);
      if (response.ok) {
        const data = await response.json();
        objGlobalFetch[category] = data;
        return data;
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
