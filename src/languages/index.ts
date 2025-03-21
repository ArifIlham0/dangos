import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales.ts/en';
import id from './locales.ts/id';

const locales = {
  en: {translation: en},
  id: {translation: id},
};

export const setLocale = (locale: string | undefined) => {
  i18n.changeLanguage(locale);
};

export const getCurrentLocale = () => i18n.language;

const initData = () => ({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: locales,
});

i18n.use(initReactI18next).init(initData);

export default i18n;

// Kalau gabisa pakai ini

// i18n.use(initReactI18next).init({
//     compatibilityJSON: 'v3',
//     fallbackLng: 'en',
//     debug: false,
//     interpolation: {
//       escapeValue: false,
//     },
//     resources: locales,
//   });

// Cara pakai untuk mengubah bahasa dan mengakses bahasa

// const {t} = useTranslation();

// const locales = [
//     {tag: 'en', name: 'English'},
//     {tag: 'id', name: 'Indonesia'},
// ];

// useEffect(() => {
//   setSelected(locales.find(l => l.tag === getCurrentLocale()));
// }, []);

// const [selected, setSelected] = useState(locales[0]);

// Di dalam onPress

// <Text>{t(I.REGISTER)}</Text>
