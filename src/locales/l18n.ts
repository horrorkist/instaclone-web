import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationKO from "./ko/translation.json";

const resources = {
  en: translationEN,
  ko: translationKO,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "ko",
});

export default i18n;
