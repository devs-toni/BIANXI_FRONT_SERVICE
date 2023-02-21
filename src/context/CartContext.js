import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [totalProducts, setTotalProducts] = useState([]);

  const handleAddProduct = (product) => {
    setTotalProducts([product, ...totalProducts]);
    console.log(totalProducts);
    localStorage.setItem("cart", JSON.stringify([product, ...totalProducts]));
  }

  const handleRemoveProduct = (product) => {

    const index = totalProducts.findIndex(p => p.id === product?.id);
    console.log(totalProducts);
    console.log(index);
    if (index !== -1) {
      const arr = [...totalProducts];
      arr.splice(index, 1);
      setTotalProducts(arr);
      localStorage.setItem("cart", JSON.stringify(arr));
    }
  }

  const findProductsById = (id) => {
    if (totalProducts?.length > 0) {
      const array = totalProducts.filter(p => p.id === id);
      return array[0] === false ? null : array;
    }
  }

  const data = { totalProducts, setTotalProducts, handleAddProduct, handleRemoveProduct, findProductsById };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export { CartProvider };
export default CartContext;
