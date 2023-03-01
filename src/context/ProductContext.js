import React, { createContext, useContext, useEffect, useState } from 'react';
import { setProductPrice, isEmptyMethod } from '../helpers/utils';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {

  const [current, setCurrent] = useState(null);
  const [color, setColor] = useState(1);
  const [size, setSize] = useState('M');
  const [updatedPrices, setUpdatedPrices] = useState(null)
  const [isEmptyProduct, setIsEmptyProduct] = useState(false);
  const [isEmptyConfig, setIsEmptyConfig] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(null)

  useEffect(() => {
    if (current) {
      setUpdatedPrices(setProductPrice(current.offer, current.price));
      setIsEmptyProduct(isEmptyMethod(current.configuration));
    }
  }, [current]);

  const data = {
    vars: {
      current,
      setCurrent,
      color,
      setColor,
      size,
      setSize,
      isEmptyProduct,
      updatedPrices,
      isEmptyConfig,
      setIsEmptyConfig,
      currentConfig,
      setCurrentConfig
    },
    funcs: {

    }
  }
  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext