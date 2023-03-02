import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();
const initialLanguage = 'es';
const translations = require('../Translation.json');

export const useLanguage = () => {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
  
  const [language, setLanguage] = useState(initialLanguage);
  const [text, setText] = useState(translations[language]);

  const handleLanguage = (e) => {
    if (e.target.value === 'es') {
      setLanguage('es');
      setText(translations.es);
    } else {
      setLanguage('en');
      setText(translations.en);
    }
  };

  const data = { text, language, handleLanguage };
  return <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
}
