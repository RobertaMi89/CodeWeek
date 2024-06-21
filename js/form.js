export function initLogInUserModal() {
  const loginModal = document.getElementById("form-container");
  const logInSignUpBtn = document.getElementById("logInSignUp");
  const loginSpan = loginModal.querySelector(".close");
  const chk = document.getElementById("chk");

  const signupForm = document.querySelector(".signup form");
  const loginForm = document.querySelector(".login form");

  const signupName = signupForm.querySelector("input[name='txt']");
  const signUpEmail = signupForm.querySelector("input[name='email']");
  const signUpPass = signupForm.querySelector("input[name='pswd']");
  const signUpPhone = signupForm.querySelector("input[name='tel']");
  const signUpAddress = signupForm.querySelector("input[name='address']");
  const signUpCreditCard = signupForm.querySelector("input[name='cardNumber']");
  const signUpCCV = signupForm.querySelector("input[name='CCV']");
  const signUpExpireCard = signupForm.querySelector("input[name='expireCard']");

  const logInEmail = loginForm.querySelector("input[name='email']");
  const logInPass = loginForm.querySelector("input[name='pswd']");

  // Nascondi la modale all'inizio
  loginModal.style.display = "none";

  logInSignUpBtn.onclick = function () {
    loginModal.style.display = "block";
  };

  signupForm.onsubmit = function (event) {
    event.preventDefault();
    signUpUser(
      signupName.value,
      signUpEmail.value,
      signUpPass.value,
      signUpAddress.value,
      signUpCreditCard.value,
      signUpPhone.value,
      signUpCCV.value,
      signUpExpireCard.value
    );
  };

  loginForm.onsubmit = function (event) {
    event.preventDefault();
    logInUser(logInEmail.value, logInPass.value);
  };

  loginSpan.onclick = function () {
    loginModal.style.display = "none";
  };

  // Aggiungi gestore di eventi per checkbox
  chk.onchange = function () {
    const loginFormContainer = document.querySelector(".login");
    const signupFormContainer = document.querySelector(".signup");
    if (chk.checked) {
      loginFormContainer.classList.add("active");
      signupFormContainer.classList.remove("active");
    } else {
      signupFormContainer.classList.add("active");
      loginFormContainer.classList.remove("active");
    }
  };

  // Verifica se l'utente è già loggato all'avvio della pagina
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    showLoggedInUI(loggedInUser.name);
  }
}

export function signUpUser(
  signUpName,
  signUpEmail,
  signUpPass,
  signUpAddress,
  signUpCreditCard,
  signUpPhone,
  signUpCCV,
  signUpExpireCard
) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((user) => user.email === signUpEmail)) {
    alert("Email already registered");
    return;
  }
  users.push({
    name: signUpName,
    email: signUpEmail,
    password: signUpPass,
    address: signUpAddress,
    cardNumber: signUpCreditCard,
    phone: signUpPhone,
    ccv: signUpCCV,
    expireCard: signUpExpireCard,
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully");
}

export function logInUser(loginEmail, loginPass) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === loginEmail && user.password === loginPass
  );
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showLoggedInUI(user.name);
    alert("Login successful");
  } else {
    alert("Invalid credentials");
  }
}

export function logOutUser() {
  localStorage.removeItem("loggedInUser");
  showLoggedOutUI();
}

function showLoggedInUI(userName) {
  const loggedInUserSpan = document.getElementById("userName");
  const logInSignUpBtn = document.getElementById("logInSignUp");
  const logOutBtn = document.getElementById("logOutBtn");

  loggedInUserSpan.textContent =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  logOutBtn.style.display = "inline-block";

  document.getElementById("form-container").style.display = "none"; // Chiude la modale di login
}

export function showLoggedOutUI() {
  const loggedInUserSpan = document.getElementById("userName");
  const logInSignUpBtn = document.getElementById("logInSignUp");
  const logOutBtn = document.getElementById("logOutBtn");

  // Rimuove eventuali dati dell'utente visibili
  loggedInUserSpan.textContent = "";
  logOutBtn.style.display = "none";
  logInSignUpBtn.style.display = "inline-block";
}

// Inizializza la modale di login al caricamento della pagina
document.addEventListener("DOMContentLoaded", function () {
  initLogInUserModal();

  // Aggiungi il gestore dell'evento per il click sul pulsante di logout
  const logOutBtn = document.getElementById("logOutBtn");
  logOutBtn.addEventListener("click", function () {
    logOutUser();
  });
});
