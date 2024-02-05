import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const browserLang = navigator.language || navigator.userLanguage;
let userLang = browserLang;
const availableLang = ["en", "fr", "ar"];

const getLangFromLocalStorage = () => {
  return localStorage.getItem("i18nextLng");
};

const setLangToLocalStorage = (lang) => {
  localStorage.setItem("i18nextLng", lang);
};

(() => {
  const lsLang = getLangFromLocalStorage();
  if (lsLang && availableLang.includes(lsLang)) {
    userLang = lsLang;
  } else {
    userLang = "en";
  }
  setLangToLocalStorage(userLang);
})();

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: userLang,
    backend: {
      loadPath: `${import.meta.env.VITE_API_BASE_URL_USERS}/locales/{{lng}}/translation`,
    },
    dubug: true,
    supportedLngs: availableLang,
    whitelist: availableLang,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
