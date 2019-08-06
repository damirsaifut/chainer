import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

import { ls } from "./ls";
import translationEN from "locales/en/transition.json";
import translationRU from "locales/ru/transition.json";

const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

let locale = navigator.language || navigator.userLanguage || "ru";
locale = locale.split('-')[0];

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: ls.locale.get() || 'ru',
        fallbackLng: 'ru',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;