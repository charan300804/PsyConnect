
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import hi from '@/locales/hi.json';
import bn from '@/locales/bn.json';
import ta from '@/locales/ta.json';
import te from '@/locales/te.json';
import mr from '@/locales/mr.json';
import gu from '@/locales/gu.json';
import kn from '@/locales/kn.json';

const translations: Record<string, any> = {
  'en-US': en,
  'es-MX': es,
  'fr-FR': fr,
  'hi-IN': hi,
  'bn-IN': bn,
  'ta-IN': ta,
  'te-IN': te,
  'mr-IN': mr,
  'gu-IN': gu,
  'kn-IN': kn,
};

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  region: string;
  t: (key: string, options?: { [key: string]: string | number }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('en-US'); // Default language
  const [region, setRegionState] = useState('US');

  // This effect runs only on the client after hydration
  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language;
      const bestMatch = Object.keys(translations).find(l => l === browserLang) ||
                        Object.keys(translations).find(l => l.startsWith(browserLang.split('-')[0])) ||
                        'en-US';
      setLanguageState(bestMatch);
      setRegionState(bestMatch.split('-')[1] || 'US');
    };
    
    detectLanguage();
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    setRegionState(lang.split('-')[1] || 'US');
  };
  
  const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
    const langFile = translations[language] || translations['en-US'];
    let translation = langFile[key] || key;

    if (options && typeof translation === 'string') {
      Object.keys(options).forEach(k => {
        const regex = new RegExp(`\\{${k}\\}`, 'g');
        translation = translation.replace(regex, String(options[k]));
      });
    }

    return translation;
  }, [language]);

  const contextValue = {
    language,
    setLanguage,
    region,
    t,
  };
  
  // By passing a key that changes with the language, we force a re-render of consumers
  return (
    <LanguageContext.Provider value={contextValue} key={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// A separate hook for translation simplifies component logic
export function useTranslation() {
    const context = useLanguage();
    return { t: context.t };
}
