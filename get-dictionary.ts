import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  am: () => import('./dictionaries/am.json').then((module) => module.default),
  om: () => import('./dictionaries/om.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  // If the locale is invalid (like 'favicon.ico'), fallback to English ('en')
  if (!['en', 'am', 'om'].includes(locale)) {
    return dictionaries.en();
  }
  
  return dictionaries[locale as 'en' | 'am' | 'om']();
}