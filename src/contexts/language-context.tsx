
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/translations';

type Language = 'english' | 'spanish' | 'french' | 'german' | 'chinese';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = 'english';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem('language');
    return (storedLanguage as Language) || defaultLanguage;
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return translations.english[key] || key;
    }
    return translations[language][key] || translations.english[key] || key;
  };

  useEffect(() => {
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      htmlTag.setAttribute('lang', language.slice(0, 2));
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
