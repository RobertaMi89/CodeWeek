let cart = [];

// Funzione per mostrare/nascondere il carrello
export function toggleCart() {
  const cartElement = document.querySelector(".cartTab");
  const cartIcon = document.getElementById("cart-icon");
  const closeButton = cartElement.querySelector(".close");

  cartIcon.addEventListener("click", () => {
    cartElement.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    cartElement.style.display = "none";
  });
}

// Recupera i dati dal localStorage all'avvio della pagina
export function initializeCart() {
  const cartElement = document.querySelector(".cartTab");
  cartElement.style.display = "none"; // Assicurati che il carrello sia nascosto all'inizio

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  } else {
    cart = []; // Inizializza il carrello se non ci sono dati nel localStorage
  }

  updateCartTotal();
  updateCartCount();
  updateCartView();

  // Aggiorna lo stato del pulsante "Acquista"
  updateCheckoutButtonState();
}

// Ottieni il carrello corrente
export function getCart() {
  return cart;
}

// Salva il carrello nel localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  const existingItem = cart.find((item) => item.title === product.title);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.totalPrice = existingItem.quantity * existingItem.price;
  } else {
    product.quantity = 1;
    product.totalPrice = product.price;
    cart.push(product);
  }

  updateCartTotal();
  updateCartCount();
  updateCartView();

  saveCartToLocalStorage();

  // Aggiorna lo stato del pulsante "Acquista" dopo l'aggiunta al carrello
  updateCheckoutButtonState();
}

function updateCartCount() {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = cartIcon.querySelector(".cart-count");

  if (cartCount) {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = `(${totalCount})`;
  }
}

function updateCartTotal() {
  let total = 0;
  cart.forEach((item) => {
    total += item.totalPrice;
  });
  const cartTotalElement = document.querySelector(".cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = `Total: ${total.toFixed(2)} $`;
  }
}

function updateCartView() {
  const listCart = document.querySelector(".listCart");
  listCart.innerHTML = ""; // Svuota la lista dei prodotti nel carrello

  cart.forEach((product) => {
    const item = document.createElement("div");
    item.id = `product_${product.id}`;
    item.classList.add("cart-item");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    const itemDetails = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `${product.price} $`;

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantity");
    quantityInput.type = "number";
    quantityInput.value = product.quantity;
    quantityInput.min = 0;

    const totalPrice = document.createElement("p");
    totalPrice.textContent = `Total: ${product.totalPrice} $`;

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("btnDelete");
    deleteBtn.textContent = "x";

    itemDetails.appendChild(title);
    itemDetails.appendChild(price);
    itemDetails.appendChild(quantityInput);
    itemDetails.appendChild(totalPrice);
    item.appendChild(img);
    item.appendChild(itemDetails);
    listCart.appendChild(item);
    item.appendChild(deleteBtn);

    // Event listener per modificare la quantità del prodotto nel carrello
    quantityInput.addEventListener("input", () => {
      let newQuantity = parseInt(quantityInput.value);
      if (newQuantity < 1) {
        newQuantity = 1; // Imposta la quantità minima a 1
      }

      // Aggiorna la quantità e il prezzo totale del prodotto nel carrello
      product.quantity = newQuantity;
      product.totalPrice = product.quantity * product.price;
      totalPrice.textContent = `Total: ${product.totalPrice} $`;
      updateCartTotal();

      // Salva nel localStorage dopo ogni modifica al carrello
      saveCartToLocalStorage();

      // Se la nuova quantità è 1 e l'utente continua a decrementare, rimuovi il prodotto dal carrello
      if (quantityInput.value === "0") {
        removeProductFromCart(product.id);
      }
    });

    // Event listener per rimuovere il prodotto dal carrello
    deleteBtn.addEventListener("click", () => {
      removeProductFromCart(product.id);
    });
  });
}

// Funzione per rimuovere il prodotto dal carrello
function removeProductFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartTotal();
    updateCartCount();
    updateCartView();
    saveCartToLocalStorage();

    // Aggiorna lo stato del pulsante "Acquista" dopo la rimozione dal carrello
    updateCheckoutButtonState();
  }
}

// Funzione per aggiornare lo stato del pulsante "Acquista"
function updateCheckoutButtonState() {
  const checkoutButton = document.querySelector(".checkOut");
  checkoutButton.disabled = cart.length === 0;
}

// Inizializza il carrello all'avvio della pagina
initializeCart();

document.addEventListener("DOMContentLoaded", function () {
  const clearBtn = document.querySelector(".clear");
  const checkoutButton = document.querySelector(".checkOut");

  // Gestore di eventi per il pulsante "Svuota"
  clearBtn.addEventListener("click", function () {
    // Svuota il carrello
    cart = [];
    saveCartToLocalStorage();

    // Aggiorna la visualizzazione del carrello
    updateCartView();

    // Aggiorna il totale e il conteggio
    updateCartTotal();
    updateCartCount();

    // Disabilita il pulsante "Acquista" se il carrello è vuoto
    updateCheckoutButtonState();
  });

  // Gestore di eventi per il pulsante "Acquista"
  checkoutButton.addEventListener("click", function () {
    // Rimpiazza con l'URL effettivo della pagina di pagamento
    window.location.href = "../../checkout/checkout.html";
  });

  // Chiama la funzione per inizializzare lo stato del pulsante "Acquista"
  updateCheckoutButtonState();
});
