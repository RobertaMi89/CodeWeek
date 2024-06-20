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

  const logInEmail = loginForm.querySelector("input[name='email']");
  const logInPass = loginForm.querySelector("input[name='pswd']");

  // Nascondi la modale all'inizio
  loginModal.style.display = "none";

  logInSignUpBtn.onclick = function () {
    loginModal.style.display = "block";
  };

  signupForm.onsubmit = function (event) {
    event.preventDefault();
    signUpUser(signupName.value, signUpEmail.value, signUpPass.value);
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
    if (chk.checked) {
      document.querySelector(".login").classList.add("active");
      document.querySelector(".signup").classList.remove("active");
    } else {
      document.querySelector(".signup").classList.add("active");
      document.querySelector(".login").classList.remove("active");
    }
  };
}

export function signUpUser(signUpName, signUpEmail, signUpPass) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((user) => user.email === signUpEmail)) {
    alert("Email already registered");
    return;
  }
  users.push({ name: signUpName, email: signUpEmail, password: signUpPass });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully");
}

export function logInUser(loginEmail, loginPass) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === loginEmail && user.password === loginPass
  );
  if (user) {
    alert("Login successful");
  } else {
    alert("Invalid credentials");
  }
}

// Inizializza la modale di login al caricamento della pagina
document.addEventListener("DOMContentLoaded", initLogInUserModal);
