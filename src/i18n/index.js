import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: Localization.getLocales?.()[0]?.languageCode === 'es' ? 'es' : 'pt',
    fallbackLng: 'pt',
    resources: { pt: { translation: pt }, es: { translation: es } },
    interpolation: { escapeValue: false },
  });

export { i18n };
