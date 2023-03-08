import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useProduct } from "./ProductContext";
import { useAuth } from "./AuthContext";
import { http } from "../helpers/http";
import { ORDERS_ENDPOINT } from "../configuration";
import { addConfigurationToProduct, addProductToCart, removeConfigInProduct, updateConfigurationStock, updateProductTotal } from "../helpers/utils";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
}

const items = JSON.parse(localStorage.getItem('CART'));

export const CartProvider = ({ children }) => {

  const { handleProduct } = useProduct();
  const { state: product_state } = handleProduct();
  const { user_state } = useAuth();

  const [cartProducts, setCartProducts] = useState(items ? items : [],)

  //SUM PRODUCT IN CART MODAL
  const handleAddProduct = (idProduct, idConf, products) => {
    const updatedProducts = updateProductTotal(products, idProduct, 1);
    updateConfigurationStock(updatedProducts, idProduct, idConf, 1);
    return updatedProducts;
  }

  //REST PRODUCT IN CART MODAL
  const handleRemoveProduct = (idProduct, idConf, products) => {
    const updatedProducts = updateProductTotal(products, idProduct, -1);
    updateConfigurationStock(updatedProducts, idProduct, idConf, -1);
    return updatedProducts;
  }

  //ADD PRODUCTS IN PRODUCT PAGE
  const handleAddSpecificNumberProduct = (item, numberProductsAdded, products) => {

    if (numberProductsAdded > 0) {
      const { id: idItem } = item;
      const { id: idConfig } = product_state.config;
      numberProductsAdded = parseInt(numberProductsAdded);
      const tempConfigurations = [{ ...product_state.config }];
      // Searching product in cart
      const indexProduct = getIndexProduct(item.id, products);
      if (indexProduct !== -1) {
        // Update general total
        const updatedProducts = updateProductTotal(products, idItem, numberProductsAdded)
        // Searching configuration in product
        const indexConfig = getIndexConfig(idConfig, indexProduct, products);
        if (indexConfig !== -1) {
          // Update previous configuration
          updateConfigurationStock(updatedProducts, idItem, idConfig, numberProductsAdded);
        } else {
          // Add new configuration
          addConfigurationToProduct(product_state.config, numberProductsAdded, updatedProducts, item);
        }
        return updatedProducts;
      } else {
        // Add new product to cart
        const preparedItem = addProductToCart(item, numberProductsAdded, tempConfigurations);
        return [preparedItem, ...products];
      }
    }
  }

  //DELETE CONFIGURATION IN CART MODAL
  const handleRemoveConfig = (idProduct, idConf, totalProductInConf, products) => {
    const updatedProducts = updateProductTotal(products, idProduct, totalProductInConf * -1);
    const newUpdatedProducts = removeConfigInProduct(updatedProducts, idProduct, idConf);
    const configsLength = newUpdatedProducts.map(prod => {
      if (prod.id == idProduct) {
        return prod.config.length;
      }
    });
    if (configsLength.join(('').split('')) == 0) {
      const updatedProducts = newUpdatedProducts.filter(prod => prod.id !== idProduct);
      return updatedProducts;
    } else
      return newUpdatedProducts;
  }

  //DELETE COMPLETE PRODUCT FROM CART
  const handleDeleteCartProduct = (id, products) => {
    const updatedProducts = products.filter(prod => prod.id !== id);
    return updatedProducts;
  }

  const getIndexProduct = (id, products) => {
    return products?.findIndex(p => p.id === id);
  }

  const getIndexConfig = (configId, indexProduct, products) => {
    return products[indexProduct]?.config?.findIndex(c => c.id == configId);
  }

  const createOrder = (products, idUser, address, amount) => {
    if (idUser) {
      const validation = http().post(`${ORDERS_ENDPOINT}/new`, {
        body: [products, idUser, address, amount]
      })
        .then(data => {
          console.log("Id de la nueva orden creada" + data);
          if (data === -1) return false;
          else return true;
        });
      return validation;
    } else return true;
  }

  //SUM PRODUCT IN CART MODAL
  const addOneProduct = useCallback((productAdd, configurationAdd) => {
    const productsAdd = handleAddProduct(productAdd, configurationAdd, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAdd));
    setCartProducts(productsAdd);
  }, []);

  //REST PRODUCT IN CART MODAL
  const deleteOneProduct = useCallback((productDel, configurationDel) => {
    const productsDel = handleRemoveProduct(productDel, configurationDel, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsDel));
    setCartProducts(productsDel);
  }, []);

  //ADD PRODUCTS IN PRODUCT PAGE
  const addProducts = useCallback((item, n) => {
    const productsAddN = handleAddSpecificNumberProduct(item, n, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAddN));
    setCartProducts(productsAddN);
  }, [product_state]);

  //DELETE CONFIGURATION IN CART MODAL
  const deleteConfiguration = useCallback((idProduct, idConf, totalProductInConf) => {
    const productsConfDel = handleRemoveConfig(idProduct, idConf, totalProductInConf, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsConfDel));
    setCartProducts(productsConfDel);
  }, []);

  //DELETE PRODUCT IN CART MODAL
  const deleteCompleteProduct = useCallback((id) => {
    const productsCompleteDel = handleDeleteCartProduct(id, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsCompleteDel));
    setCartProducts(productsCompleteDel);
  }, []);


  const successPayment = useCallback((form, price) => {
    const customerOrder = user_state.isAuthenticated ? user_state.id : null;
    const result = createOrder(
      cartProducts.map(p => p.id),
      customerOrder,
      form.address,
      price
    );
    if (result) {
      localStorage.removeItem("CART");
      setCartProducts([]);
    }
  }, []);


  //TOTAL CHARGE IN CART
  const getTotalPriceCart = useCallback((products) => {
    let total = 0;
    products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return total;
  }, []);

  const getIVAPriceCart = useCallback((products) => {
    let total = 0;
    products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return (total * 21) / 100;
  }, [])

  const data = useMemo(() => ({
    cartProducts,
    addOneProduct,
    deleteOneProduct,
    addProducts,
    deleteConfiguration,
    deleteCompleteProduct,
    successPayment,
    getIVAPriceCart,
    getTotalPriceCart
  }), [cartProducts, addOneProduct, deleteOneProduct, addProducts, deleteConfiguration, deleteCompleteProduct, successPayment, getIVAPriceCart, getTotalPriceCart])

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}