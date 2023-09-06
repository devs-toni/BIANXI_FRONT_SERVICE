import React, { useContext, useEffect, useState, createContext } from 'react'
import { COLORS_ENDPOINT, PRODUCTS_ENDPOINT, SIZES_ENDPOINT } from '../config/configuration';
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
    console.log(process.env.REACT_APP_API_URL)
    console.log(PRODUCTS_ENDPOINT);
;
    http().get(`${PRODUCTS_ENDPOINT}`)
      .then(data => setProducts(data.filter(product => product.type !== "ebike")))
      .catch(err => console.error(err));

    http().get(`${COLORS_ENDPOINT}`)
      .then(data => setColors(data))
      .catch(err => console.error(err));

    http().get(`${SIZES_ENDPOINT}`)
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
    if (name === "es") {
      setLanguage('es');
      setText(translations.es);
    } else if (name === "en") {
      setLanguage('en');
      setText(translations.en);
    } else if (name === "it") {
      setLanguage('it');
      setText(translations.it);
    }
  };

  const data = { text, language, handleLanguage };
  return <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
}