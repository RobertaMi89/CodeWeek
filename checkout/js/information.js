export function saveUserInfo() {
  const userInfo = {
    firstName: document.querySelector('input[name="f-name"]').value,
    lastName: document.querySelector('input[name="l-name"]').value,
    address: document.querySelector('input[name="address"]').value,
    city: document.querySelector('input[name="city"]').value,
    state: document.querySelector('input[name="state"]').value,
    zip: document.querySelector('input[name="zip"]').value,
    cardNumber: document.querySelector('input[name="card-num"]').value,
    expire: document.querySelector('input[name="expire"]').value,
    security: document.querySelector('input[name="security"]').value,
    total: calculateTotal(), // Esempio: funzione per calcolare il totale dell'ordine
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function loadUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    document.querySelector('input[name="f-name"]').value =
      userInfo.firstName || "";
    document.querySelector('input[name="l-name"]').value =
      userInfo.lastName || "";
    document.querySelector('input[name="address"]').value =
      userInfo.address || "";
    document.querySelector('input[name="city"]').value = userInfo.city || "";
    document.querySelector('input[name="state"]').value = userInfo.state || "";
    document.querySelector('input[name="zip"]').value = userInfo.zip || "";
    document.querySelector('input[name="card-num"]').value =
      userInfo.cardNumber || "";
    document.querySelector('input[name="expire"]').value =
      userInfo.expire || "";
    document.querySelector('input[name="security"]').value =
      userInfo.security || "";
    document.querySelector(".orderTotal").textContent = `€${userInfo.total}`; // Aggiorna il totale dell'ordine
  }
}

// Funzione per calcolare il totale dell'ordine (da implementare secondo le tue necessità)
function calculateTotal() {
  // Esempio di implementazione di calcolo del totale
  return 100; // Sostituisci con il calcolo effettivo del totale dell'ordine
}

// Funzione per mostrare la thank you page
function showThankYouPage(userInfo) {
  const modalThankYou = document.createElement("div");
  modalThankYou.classList.add("modalThankYou");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const title = document.createElement("h2");
  title.textContent = "Grazie per il tuo ordine!";
  modalContent.appendChild(title);

  // Crea e aggiungi il riepilogo dell'ordine
  const orderSummary = document.createElement("div");
  orderSummary.classList.add("orderSummary");

  const nameLabel = document.createElement("p");
  nameLabel.innerHTML = `<strong>Nome:</strong> ${userInfo.firstName} ${userInfo.lastName}`;
  orderSummary.appendChild(nameLabel);

  const addressLabel = document.createElement("p");
  addressLabel.innerHTML = `<strong>Indirizzo:</strong> ${userInfo.address}, ${userInfo.city}, ${userInfo.state}, ${userInfo.zip}`;
  orderSummary.appendChild(addressLabel);

  const cardLabel = document.createElement("p");
  cardLabel.innerHTML = `<strong>N. Carta Credito:</strong> ${userInfo.cardNumber}`;
  orderSummary.appendChild(cardLabel);

  const expireLabel = document.createElement("p");
  expireLabel.innerHTML = `<strong>Scadenza:</strong> ${userInfo.expire}`;
  orderSummary.appendChild(expireLabel);

  const securityLabel = document.createElement("p");
  securityLabel.innerHTML = `<strong>CCV:</strong> ${userInfo.security}`;
  orderSummary.appendChild(securityLabel);

  const totalLabel = document.createElement("p");
  totalLabel.innerHTML = `<strong>Totale Ordine:</strong> €${userInfo.total.toFixed(
    2
  )}`;
  orderSummary.appendChild(totalLabel);

  modalContent.appendChild(orderSummary);

  // Bottone per tornare alla homepage
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Torna alla Homepage";
  closeBtn.classList.add("close-btn");
  closeBtn.addEventListener("click", () => {
    modalThankYou.style.display = "none";
    window.location.href = "index.html"; // Reindirizza alla homepage
  });

  modalContent.appendChild(closeBtn);
  modalThankYou.appendChild(modalContent);

  // Aggiungi la modale alla pagina
  document.body.appendChild(modalThankYou);

  // Mostra la modale
  modalThankYou.style.display = "block";
}

// Event listener per il click sul pulsante "Procedi"
document.querySelector(".btns button").addEventListener("click", (e) => {
  e.preventDefault();
  saveUserInfo();
});

// Carica i dati utente al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
  loadUserInfo();
});
// Funzione per ottenere il totale del carrello
export function getCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  return total.toFixed(2); // Ritorna il totale arrotondato a due decimali
}
