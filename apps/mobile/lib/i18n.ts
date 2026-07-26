import 'intl-pluralrules';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import hi from '../locales/hi.json';
import en from '../locales/en.json';

const deviceLang = getLocales()[0]?.languageCode ?? 'hi';
const lng = deviceLang === 'en' ? 'en' : 'hi';

i18next
  .use(initReactI18next)
  .init({
    lng,
    fallbackLng: 'en',
    resources: {
      hi: { translation: hi },
      en: { translation: en },
    },
    interpolation: { escapeValue: false },
  });

export default i18next;
