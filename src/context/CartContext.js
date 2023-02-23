import { createContext, useState, useEffect } from "react";

const CartContext = createContext();
const items = JSON.parse(localStorage.getItem('cart'));


const CartProvider = ({ children }) => {

  const [totalProducts, setTotalProducts] = useState(items ? items : []);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(totalProducts));
  }, [totalProducts]);

  const handleAddProduct = (product) => {
    const indexProduct = getIndexProduct(product.id);
    if (indexProduct !== -1) {
      changeCountProduct(indexProduct, '+');
    } else {
      setTotalProducts([product, ...totalProducts]);
    }
  }

  const handleRemoveProduct = (product) => {
    const p = totalProducts.find(p => p.id === product?.id);
    const index = totalProducts.findIndex(p => p.id === product?.id);

    if (p) {
      if (p.total > 1) {
        changeCountProduct(index, '-');
      } else {
        const arr = [...totalProducts];
        arr.splice(index, 1);
        setTotalProducts(arr);
      }
    }
  }

  const findNumberProduct = id => {
    return totalProducts.find(p => p.id === id)?.total;
  }

  const getIndexProduct = id => {
    return totalProducts.findIndex(p => p.id === id);
  }

  const changeCountProduct = (index, op) => {
    if (op === '+') totalProducts[index].total = totalProducts[index].total + 1;
    else totalProducts[index].total = totalProducts[index].total - 1;
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (isOpen) {
      document.getElementById('root').style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.getElementById('root').style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleCart = (e) => {
    console.log('Hago algo');
    setIsOpen(!isOpen);
  }

  const closeCart = (e) => {
    isOpen && setIsOpen(false);
  }


  const data = {
    totalProducts,
    setTotalProducts,
    handleAddProduct,
    handleRemoveProduct,
    findNumberProduct,
    isOpen,
    setIsOpen,
    handleCart,
    closeCart
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export { CartProvider };
export default CartContext;
