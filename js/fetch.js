/*LOCAL STATE*/
/*per evitare di fare troppe chiamate alla fetch, creo un oggetto vuoto e poi eseguo dei controlli. se la category non è mai stata ciamata esegue la fetch e la deposita nell'oggetto ,altrimenti va a leggere l'oggetto in cui già risiede*/

const localState = {};

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderCards(data);
  });
