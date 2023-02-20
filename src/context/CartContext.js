import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [totalProducts, setTotalProducts] = useState([]);

  const handleAddCart = (product) => {
     setTotalProducts([product, ...totalProducts]);
  }

   const getTotalProducts = (name) => {
    const array =  totalProducts.filter(p => p.name === name);
    return array[0] === false ? null : array;
  } 

  const data = { totalProducts, handleAddCart, getTotalProducts };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export { CartProvider };
export default CartContext;
