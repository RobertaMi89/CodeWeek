/*LOCAL STATE*/
/*per evitare di fare troppe chiamate alla fetch, creo un oggetto vuoto e poi eseguo dei controlli. se la category non è mai stata ciamata esegue la fetch e la deposita nell'oggetto ,altrimenti va a leggere l'oggetto in cui già risiede*/
const apiUrl = "https://fakestoreapi.com";
const products = `${apiUrl}/products`;
const categories = `${products}/category`;
const electronics = `/electronics`;
const jewelery = `/jewelery`;
const menClothes = `/men's_clothing`;
const womenClothes = `/women's_clothing`;

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
