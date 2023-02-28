import React, { useContext, useEffect, useState, createContext } from 'react'
import { colorsUrl, sizesUrl } from '../config';
import { get } from '../helpers/rest.js';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  useEffect(() => {
    get(setColors, `${colorsUrl}/get/all`);
    get(setSizes, `${sizesUrl}/get/all`);
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