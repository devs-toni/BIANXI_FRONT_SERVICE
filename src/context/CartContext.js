import { createContext, useState, useEffect, useContext } from "react";
import { useProduct } from "./ProductContext";

const CartContext = createContext();
const items = JSON.parse(localStorage.getItem('cart'));

export const useCart = () => {
  return useContext(CartContext);
}


export const CartProvider = ({ children }) => {

  ////////////////////////////////////////////////////////////////////////////// LOGIC

  const [totalProducts, setTotalProducts] = useState(items ? items : []);
  const { vars } = useProduct();
  const { currentConfig } = vars;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(totalProducts));
    console.log(totalProducts)
  }, [totalProducts]);


  // Singular Actions

  const handleAddProduct = (product) => {
    const indexProduct = getIndexProduct(product.id);
    if (indexProduct !== -1) {
      const updatedProducts = totalProducts.map(prod => {
        if (prod.id === product.id) {
          prod.total = prod.total + 1;
        }
        return prod;
      })
      setTotalProducts(updatedProducts);
    } else
      setTotalProducts([product, ...totalProducts]);
  }

  const handleRemoveProduct = (product) => {
    const p = totalProducts.find(p => p.id === product?.id);
    const index = totalProducts.findIndex(p => p.id === product?.id);
    if (p)
      if (p.total > 1) {
        const updatedProducts = totalProducts.map(prod => {
          if (prod.id === product.id) {
            prod.total = prod.total - 1;
          }
          return prod;
        })
        setTotalProducts(updatedProducts);
      } else {
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
  const getIndexConfig = id => {
    let index;
    totalProducts.forEach(p => {
      index = p.config.findIndex(cnf => cnf.id == id)
    })
    return index;
  }

  const getProduct = (id) => {
    return totalProducts[getIndexProduct(id)];
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
  }

  const handleAddSpecificNumberProduct = (item, total) => {
    const { id, name, offer, price, type, final } = item;
    total = parseInt(total);
    const config = [{ ...currentConfig }];

    const indexProduct = getIndexProduct(item.id);

    if (indexProduct !== -1) {
      const updatedProducts = totalProducts.map(prod => {
        if (prod.id === item.id) {
          prod.total = parseInt(prod.total) + parseInt(total);
        }
        return prod;
      });
      const indexConfig = getIndexConfig(currentConfig.id);
      console.log(indexConfig);
      if (indexConfig !== -1) {
        updatedProducts.filter(prod => prod.id == item.id)[0].config.map(cnf => {
          if (cnf.id === currentConfig.id) {
            cnf.total = parseInt(cnf.total) + total;
            cnf.stock = parseInt(cnf.stock) - total;
          }
        });
      } else {
        config[0].total = total;
        config[0].stock = config[0].stock - total;
        updatedProducts.filter(prod => prod.id == item.id)[0].config.push(config[0]);
      }

      setTotalProducts(updatedProducts);

    } else {
      config[0].total = total;
      config[0].stock = config[0].stock - total;
      const necessaryItem = {
        id, name, offer, price, final, type, total, config
      }
      setTotalProducts([necessaryItem, ...totalProducts]);
    }
  }

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
    vars: {
      totalProducts,
      setTotalProducts,
    },
    funcs: {
      handleAddProduct,
      handleRemoveProduct,
      handleAddSpecificNumberProduct,
      deleteAllProductRepeats,
    },
    extra: {
      findNumberProduct,
      getTotalPriceCart,
      getIVAPriceCart,
      getProduct
    },
    modal: {
      isOpen,
      setIsOpen,
      handleCart,
      closeCart,
    }
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
