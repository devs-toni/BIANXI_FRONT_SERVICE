import React, { useContext, useEffect, useState, createContext } from 'react'
import { colorsUrl, sizesUrl } from '../config';
import { http } from '../helpers/HTTP_Connection';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  useEffect(() => {
    
    http().get(`${colorsUrl}/get/all`)
      .then(data => setColors(data))
      .catch(err => console.error(err));

    http().get(`${sizesUrl}/get/all`)
      .then(data => setSizes(data))
      .catch(err => console.error(err));
  }, [])

  const data = {
    products: {
      products,
      setProducts
    },
    colors: {
      colors,
      setColors
    },
    sizes: {
      sizes,
      setSizes
    }
  }

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  )
}

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