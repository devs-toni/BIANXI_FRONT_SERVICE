import { createContext, useState, useEffect } from "react";

const CartContext = createContext();
const items = JSON.parse(localStorage.getItem('cart'));


const CartProvider = ({ children }) => {

  ////////////////////////////////////////////////////////////////////////////// LOGIC

  // Total of products in cart
  const [totalProducts, setTotalProducts] = useState(items ? items : []);
  // Control the sum of products that you already have in cart
  const [countChanged, setCountChanged] = useState(false);

  // When total products is updated, localStorage is updated
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(totalProducts));
  }, [totalProducts]);

  // When you sum products that you already have in cart, localStorage is updated
  useEffect(() => {
    countChanged &&
      localStorage.setItem("cart", JSON.stringify(totalProducts));

    return () => { setCountChanged(false) }
  }, [countChanged]);

  // Add products in cart modal directly with live changes
  const handleAddProduct = (product) => {
    const indexProduct = getIndexProduct(product.id);
    if (indexProduct !== -1)
      changeCountProduct(indexProduct, '+');
    else
      setTotalProducts([product, ...totalProducts]);

  }

  const handleRemoveProduct = (product) => {
    const p = totalProducts.find(p => p.id === product?.id);
    const index = totalProducts.findIndex(p => p.id === product?.id);
    if (p)
      if (p.total > 1)
        changeCountProduct(index, '-');
      else {
        const arr = [...totalProducts];
        arr.splice(index, 1);
        setTotalProducts(arr);
      }
  }

  const findNumberProduct = id => {
    return totalProducts.find(p => p.id === id)?.total;
  }

  const getIndexProduct = id => {
    return totalProducts.findIndex(p => p.id === id);
  }

  const getProduct = (id) => {
    return totalProducts[getIndexProduct(id)];
  }

  const changeCountProduct = (index, op) => {
    const product = totalProducts[index];

    if (op === '+')
      if (product.stock >= product.total + 1) {
        product.total = product.total + 1;
        setCountChanged(true);
      }
    if (op === '-')
      if (product.stock >= 0) {
        product.total = product.total - 1;
        setCountChanged(true);
      }
  }

  const getTotalPriceCart = () => {
    let total = 0;
    totalProducts.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return total;
  }

  const getIVAPriceCart = () => {
    let total = 0;
    totalProducts.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return (total * 21) / 100;
  }

  const deleteAllProductRepeats = (id) => {
    totalProducts.map(p => p.id === id && (p.total = 1));
    setTotalProducts(totalProducts.filter(p => p.id !== id));
    setCountChanged(true);
  }

  const addItemsToCart = (item, total) => {
    const indexProduct = getIndexProduct(item.id);
    if (indexProduct !== -1) {
      totalProducts[indexProduct].total = total;
      //totalProducts[indexProduct].stock = totalProducts[indexProduct].stock - total;
    } else {
      item.total = total;
      //item.stock = item.stock - total;
      setTotalProducts([item, ...totalProducts]);
    }
    setCountChanged(true);
  }



  // Stock Calculator

  const productIsEmpty = () => {
    
  };

  //////////////////////////////////////////////////////////////////////// VISUAL

  const [isOpen, setIsOpen] = useState(false);
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
    closeCart,
    countChanged,
    getTotalPriceCart,
    getIVAPriceCart,
    deleteAllProductRepeats,
    addItemsToCart,
    getProduct
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export { CartProvider };
export default CartContext;
