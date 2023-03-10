import React, { useContext, useEffect, useState, createContext } from 'react'
import { COLORS_ENDPOINT, PRODUCTS_ENDPOINT, SIZES_ENDPOINT } from '../configuration';
import { http } from '../helpers/http';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  useEffect(() => {
    
    http().get(`${PRODUCTS_ENDPOINT}/get/all`)
      .then(data => setProducts(data))
      .catch(err => console.error(err));

    http().get(`${COLORS_ENDPOINT}/get/all`)
      .then(data => setColors(data))
      .catch(err => console.error(err));

    http().get(`${SIZES_ENDPOINT}/get/all`)
      .then(data => setSizes(data))
      .catch(err => console.error(err));
  }, [])

  const data = {
    allProducts: {
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

  const handleLanguage = ({ target }) => {
    const { name } = target;
    if (name === "spa") {
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