import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState(null);
  const [current, setCurrent] = useState(null);
  const [color, setColor] = useState(1);
  const [size, setSize] = useState('M');


  const data = {
    vars: {
      products,
      setProducts,
      current,
      setCurrent,
      color,
      setColor,
      size,
      setSize
    },
    funcs: {

    }
  }
  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext