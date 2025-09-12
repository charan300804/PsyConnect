
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
  setRegion: (region: string) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('en-US');
  const [region, setRegionState] = useState('US');

  useEffect(() => {
    const detectLanguage = () => {
        if (typeof window !== 'undefined' && navigator) {
            const browserLang = navigator.language;
            const bestMatch = Object.keys(translations).find(l => l === browserLang) ||
                              Object.keys(translations).find(l => l.startsWith(browserLang.split('-')[0])) ||
                              'en-US';
            setLanguage(bestMatch);
        }
    };
    detectLanguage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    const newRegion = lang.split('-')[1] || 'US';
    setRegionState(newRegion);
  };
  
  const setRegion = (reg: string) => {
    setRegionState(reg);
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, region, setRegion, t }}>
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

export function useTranslation() {
  const context = useLanguage();
  return { t: context.t };
}
