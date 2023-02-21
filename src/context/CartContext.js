import { createContext, useState, useEffect } from "react";

const CartContext = createContext();
const items = JSON.parse(localStorage.getItem('cart'));
let totalItems = 0;
items?.forEach(i => {
  totalItems += i.count;
});

const CartProvider = ({ children }) => {

  const [totalProducts, setTotalProducts] = useState(items ? items : []);
  const [numberTotalProducts, setNumberTotalProducts] = useState(totalItems);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(totalProducts));
  }, [totalProducts, numberTotalProducts]);

  const handleAddProduct = (product) => {
    const indexProduct = getIndexProduct(product.id);
    if (indexProduct !== -1) {
      changeCountProduct(indexProduct, '+');
    } else {
      setTotalProducts([product, ...totalProducts]);
    }
    setNumberTotalProducts(products => products + 1);
  }

  const handleRemoveProduct = (product) => {
    const p = totalProducts.find(p => p.id === product?.id);
    const index = totalProducts.findIndex(p => p.id === product?.id);

    if (p) {
      if (p?.count > 1) {
        changeCountProduct(index, '-');
      } else {
        const arr = [...totalProducts];
        arr.splice(index, 1);
        setTotalProducts(arr);
      }
      setNumberTotalProducts(products => products - 1);
    }
  }

  const findNumberProduct = id => {
    return totalProducts.find(p => p.id === id)?.count;
  }

  const getIndexProduct = id => {
    return totalProducts.findIndex(p => p.id === id);
  }

  const changeCountProduct = (index, op) => {
    if (op === '+') totalProducts[index].count = totalProducts[index].count + 1;
    else totalProducts[index].count = totalProducts[index].count - 1;
  }

  const data = { totalProducts, setTotalProducts, handleAddProduct, handleRemoveProduct, findNumberProduct, numberTotalProducts };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export { CartProvider };
export default CartContext;
