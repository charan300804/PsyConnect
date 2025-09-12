
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  region: string;
  setRegion: (region: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en-US');
  const [region, setRegion] = useState(() => {
    if (typeof window !== 'undefined') {
      return (Intl as any).DateTimeFormat().resolvedOptions().timeZone;
    }
    return 'UTC';
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage, region, setRegion }}>
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
