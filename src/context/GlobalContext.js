import React, { useContext, useEffect, useState, createContext } from 'react'
import { useQueryGetProducts } from '../persistence/products';
import { useQueryGetColors } from '../persistence/colors';
import { useQueryGetSizes } from '../persistence/sizes';


const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  const { data: productsData, status: productsStatus } = useQueryGetProducts();
  const { data: colorsData, status: colorsStatus } = useQueryGetColors();
  const { data: sizesData, status: sizesStatus } = useQueryGetSizes();


  useEffect(() => {
    if (productsStatus === 'success') setProducts(productsData.filter(product => product.type !== "ebike"));
    if (colorsStatus === 'success') setColors(colorsData)
    if (sizesStatus === 'success') setSizes(sizesData)

  }, [productsData, productsStatus, colorsStatus, colorsData, sizesData, sizesStatus]);

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