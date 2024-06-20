let translations = {};
let currentLanguage = "it";

export async function loadTranslations(language) {
  try {
    const response = await fetch("./js/translations.json");
    const data = await response.json();
    translations = data;
    setCurrentLanguage(language);
    translateUI();
  } catch (error) {
    console.error("Errore durante il caricamento delle traduzioni:", error);
  }
}

export function setCurrentLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("language", language);
}

export function getCurrentLanguage() {
  return localStorage.getItem("language") || currentLanguage;
}

export function translate(key) {
  const keys = key.split(".");
  let result = translations[currentLanguage];

  for (let k of keys) {
    result = result ? result[k] : null;
  }

  return result || key;
}

export function translateUI() {
  const translatableElements = document.querySelectorAll("[data-translate]");
  translatableElements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = translate(key);
  });
}

// Carica le traduzioni iniziali
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = getCurrentLanguage();
  loadTranslations(savedLanguage);
});
