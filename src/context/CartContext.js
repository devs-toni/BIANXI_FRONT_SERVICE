import { createContext, useState, useEffect, useContext } from "react";
import { useProduct } from "./ProductContext";
import {
  addProductToCart,
  updateProductTotal,
  addConfigurationToProduct,
  updateConfigurationStock
} from "../helpers/utils";

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

  /*   const handleAddProduct = (product) => {
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
    } */

  /*   const handleRemoveProduct = (product) => {
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
    } */

  const findNumberProduct = id => {
    return totalProducts.find(p => p.id === id)?.total;
  }

  const getIndexProduct = id => {
    return totalProducts.findIndex(p => p.id === id);
  }

  const getIndexConfig = (configId, indexProduct) => {
    return totalProducts[indexProduct].config.findIndex(c => c.id == configId);
  }

  const getProduct = (id) => {
    return totalProducts[getIndexProduct(id)];
  }

  /*   const getTotalPriceCart = () => {
      let total = 0;
      totalProducts.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
      return total;
    }
  
    const getIVAPriceCart = () => {
      let total = 0;
      totalProducts.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
      return (total * 21) / 100;
    } */

  /*   const deleteAllProductRepeats = (id) => {
      totalProducts.map(p => p.id === id && (p.total = 1));
      setTotalProducts(totalProducts.filter(p => p.id !== id));
    } */

  const handleAddSpecificNumberProduct = (item, numberProductsAdded) => {
    numberProductsAdded = parseInt(numberProductsAdded);
    const tempConfigurations = [{ ...currentConfig }];
    // Searching product in cart
    const indexProduct = getIndexProduct(item.id);
    if (indexProduct !== -1) {
      // Update general total
      const updatedProducts = updateProductTotal(totalProducts, item, numberProductsAdded)
      // Searching configuration in product
      const indexConfig = getIndexConfig(currentConfig.id, indexProduct);
      if (indexConfig !== -1) {
        // Update previous configuration
        updateConfigurationStock(updatedProducts, item, currentConfig, numberProductsAdded);
      } else {
        // Add new configuration
        addConfigurationToProduct(currentConfig, numberProductsAdded, updatedProducts, item);
      }
      setTotalProducts(updatedProducts);
    } else {
      // Add new product to cart
      const preparedItem = addProductToCart(item, numberProductsAdded, tempConfigurations);
      setTotalProducts([preparedItem, ...totalProducts]);
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
      //handleAddProduct,
      //handleRemoveProduct,
      handleAddSpecificNumberProduct,
      //deleteAllProductRepeats,
    },
    extra: {
      findNumberProduct,
      //getTotalPriceCart,
      //getIVAPriceCart,
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
