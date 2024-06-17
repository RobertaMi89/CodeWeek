//creazione card
const cardsContainer = document.querySelector("#cards-container");
function renderCards(data) {
  data.forEach((e) => {
    const div = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h3");
    const price = document.createElement("p");

    div.classList = "card";
    image.classList = "card-img";
    price.classList = "card-price";

    image.src = e.image;
    title.textContent = e.title;
    price.textContent = `${e.price} €`;
    div.appendChild(image);
    div.appendChild(title);
    div.appendChild(price);
    cardsContainer.appendChild(div);
  });
}
cardsContainer.innerHTML = "";
export { renderCards };
