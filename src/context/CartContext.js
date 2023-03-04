import { createContext, useState, useEffect, useContext } from "react";
import { useProduct } from "./ProductContext";
import {
  addProductToCart,
  updateProductTotal,
  addConfigurationToProduct,
  updateConfigurationStock,
  removeConfigInProduct
} from "../helpers/utils";
import { useUI } from "./UIContext";

const CartContext = createContext();
const items = JSON.parse(localStorage.getItem('cart'));

export const useCart = () => {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {

  ////////////////////////////////////////////////////////////////////////////// LOGIC

  const [totalProducts, setTotalProducts] = useState(items ? items : []);

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const { PRODUCT_ACTIONS, configureProduct } = useProduct();
  const { state: product_state } = configureProduct();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(totalProducts));
    //console.log(totalProducts)
  }, [totalProducts]);

  const handleAddProduct = (idProduct, idConf) => {
    const updatedProducts = updateProductTotal(totalProducts, idProduct, 1);
    updateConfigurationStock(updatedProducts, idProduct, idConf, 1);
    setTotalProducts(updatedProducts);
  }

  const handleRemoveProduct = (idProduct, idConf) => {
    const updatedProducts = updateProductTotal(totalProducts, idProduct, -1);
    updateConfigurationStock(updatedProducts, idProduct, idConf, -1);
    setTotalProducts(updatedProducts);
  }

  const removeProduct = (id) => {
    const updatedProducts = totalProducts.filter(prod => prod.id !== id);
    setTotalProducts(updatedProducts);
  }

  const handleRemoveConfig = (idProduct, idConf, totalProductInConf) => {
    const updatedProducts = updateProductTotal(totalProducts, idProduct, totalProductInConf * -1);
    const newUpdatedProducts = removeConfigInProduct(updatedProducts, idProduct, idConf);
    const configsLength = newUpdatedProducts.map(prod => {
      if (prod.id == idProduct) {
        return prod.config.length;
      }
    });

    if (configsLength.join(('').split('')) == 0) {
      const updatedProducts = newUpdatedProducts.filter(prod => prod.id !== idProduct);
      setTotalProducts(updatedProducts);

    } else
      setTotalProducts(newUpdatedProducts);
  }

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

  const handleAddSpecificNumberProduct = (item, numberProductsAdded) => {
    const { id: idItem } = item;
    const { id: idConfig } = product_state.config;
    numberProductsAdded = parseInt(numberProductsAdded);
    const tempConfigurations = [{ ...product_state.config }];
    // Searching product in cart
    const indexProduct = getIndexProduct(item.id);
    if (indexProduct !== -1) {
      // Update general total
      const updatedProducts = updateProductTotal(totalProducts, idItem, numberProductsAdded)
      // Searching configuration in product
      const indexConfig = getIndexConfig(idConfig, indexProduct);
      if (indexConfig !== -1) {
        // Update previous configuration
        updateConfigurationStock(updatedProducts, idItem, idConfig, numberProductsAdded);
      } else {
        // Add new configuration
        addConfigurationToProduct(product_state.config, numberProductsAdded, updatedProducts, item);
      }
      setTotalProducts(updatedProducts);
    } else {
      // Add new product to cart
      const preparedItem = addProductToCart(item, numberProductsAdded, tempConfigurations);
      setTotalProducts([preparedItem, ...totalProducts]);
    }

    ui_dispatch({ type: UI_ACTIONS.HANDLE_CART });
  }

  //////////////////////////////////////////////////////////////////////// VISUAL

  const data = {
    vars: {
      totalProducts,
      setTotalProducts,
    },
    funcs: {
      handleAddProduct,
      handleRemoveProduct,
      handleRemoveConfig,
      removeProduct,
      handleAddSpecificNumberProduct,
      //deleteAllProductRepeats,
    },
    extra: {
      findNumberProduct,
      getTotalPriceCart,
      getIVAPriceCart,
      getProduct
    }
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
