import { getCart, saveCartToLocalStorage } from "../../js/cart.js";

// Funzione per inizializzare il carrello nella modale di pagamento
export function initializeCartForCheckout() {
  const cartCheckElement = document.querySelector(
    ".modalCheckOut .listCartCheck"
  );

  // Recupera il carrello corrente dal localStorage
  let cart = getCart();

  // Aggiorna la visualizzazione iniziale del carrello nella modale di pagamento
  appendCartProducts(cartCheckElement, cart);

  // Event listener per modificare la quantità del prodotto nel carrello della modale di pagamento
  cartCheckElement.addEventListener("input", (event) => {
    const quantityInput = event.target;
    const productId = parseInt(quantityInput.dataset.productId);
    let newQuantity = parseInt(quantityInput.value);

    // Trova il prodotto nel carrello
    const product = cart.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    // Imposta la quantità minima a 1 se il valore è inferiore
    if (newQuantity < 1) {
      newQuantity = 1;
      quantityInput.value = newQuantity;
    }

    // Aggiorna la quantità e il prezzo totale del prodotto nel carrello
    product.quantity = newQuantity;
    product.totalPrice = product.quantity * product.price;
    updateCartTotal();
    updateCartCount();
    appendCartProducts(cartCheckElement, cart);

    // Salva nel localStorage dopo ogni modifica al carrello
    saveCartToLocalStorage();
  });

  // Event listener per rimuovere il prodotto dal carrello nella modale di pagamento
  cartCheckElement.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".btnDelete");
    if (deleteBtn) {
      const productId = parseInt(deleteBtn.dataset.productId);
      removeProductFromCart(productId);
    }
  });

  // rimuove il prodotto dal carrello
  function removeProductFromCart(productId) {
    const cartCheckElement = document.querySelector(
      ".modalCheckOut .listCartCheck"
    );

    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartTotal();
      updateCartCount();
      appendCartProducts(cartCheckElement, cart);
      saveCartToLocalStorage();
    }
  }

  // aggiorna il totale del carrello nella modale di pagamento
  function updateCartTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.totalPrice;
    });
    const cartTotalElement = document.querySelector(
      ".modalCheckOut .cartTotalCheck"
    );
    if (cartTotalElement) {
      cartTotalElement.textContent = `Total: ${total.toFixed(2)} $`;
    }
  }

  //aggiorna il conteggio dei prodotti nel carrello della modale di pagamento
  function updateCartCount() {
    const cartCount = document.querySelector(".modalCheckOut .cart-count");
    if (cartCount) {
      const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCount.textContent = `(${totalCount})`;
    }
  }

  // Inizializza il carrello nella modale di pagamento all'avvio della pagina
  updateCartTotal();
  updateCartCount();
}

// Aggiorna la visualizzazione del carrello nella modale di pagamento
export function appendCartProducts(divToAppend, cart) {
  divToAppend.innerHTML = "";

  cart = getCart();

  cart.forEach((product) => {
    const item = document.createElement("div");
    item.id = `product_${product.id}`;
    item.classList.add("cartItemCheck");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("span");
    price.textContent = `${product.price} $`;

    const quantityText = document.createElement("span");
    quantityText.textContent = "Qt: ";

    const quantity = document.createElement("span");
    quantity.textContent = product.quantity;

    const totalPrice = document.createElement("p");
    totalPrice.textContent = `Total: ${product.totalPrice} $`;

    item.appendChild(title);
    item.appendChild(price);
    item.appendChild(quantityText);
    item.appendChild(quantity);
    item.appendChild(totalPrice);

    divToAppend.appendChild(item);
    console.log(item);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cartTabCheck = document.querySelector(".modalCheckOut");

  //click sul bottone "X" per chiudere la modale
  closeModalBtn.addEventListener("click", function () {
    cartTabCheck.style.display = "none";
  });
});
