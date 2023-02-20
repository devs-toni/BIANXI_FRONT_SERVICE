import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [totalProducts, setTotalProducts] = useState([]);

  const handleAddCart = (product) => {

    if (!totalProducts.some(p => p.name === product.name)) {
      setTotalProducts([product, ...totalProducts]);
    }
  }

  const data = { totalProducts, handleAddCart };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export { CartProvider };
export default CartContext;
