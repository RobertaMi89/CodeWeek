let translations = {};
let currentLanguage = "it";

export async function loadTranslations(language) {
  try {
    const response = await fetch("./js/translations.json");
    const data = await response.json();
    translations = data;
    currentLanguage = language;
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
  return translations[currentLanguage] && translations[currentLanguage][key]
    ? translations[currentLanguage][key]
    : key;
}

export function getCurrentTranslations() {
  return translations[currentLanguage];
}
