
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en-US');
  const [region, setRegion] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e) {
        return 'UTC';
      }
    }
    return 'UTC';
  });
  
  const t = (key: string) => {
    const langKey = language.split('-')[0];
    const langFile = translations[language] || translations['en-US'];
    return langFile[key] || key;
  };

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
  const { t } = useLanguage();
  return { t };
}
