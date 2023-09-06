import { ORDERS_ENDPOINT } from "../config/configuration";
import { http } from "./http";
import { addConfigurationToProduct, addProductToCart, removeConfigInProduct, updateConfigurationStock, updateProductTotal } from "./utils";

export const getMainMethods = (product_state) => {

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
    // eslint-disable-next-line array-callback-return
    const configsLength = newUpdatedProducts.map(prod => {
      // eslint-disable-next-line eqeqeq
      if (prod.id == idProduct) {
        return prod.config.length;
      }
    });
    // eslint-disable-next-line eqeqeq
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
    // eslint-disable-next-line eqeqeq
    return products[indexProduct]?.config?.findIndex(c => c.id == configId);
  }

  const createOrder = async (products, idUser, address, amount) => {

    if (idUser) {
      const validation = await http().post(`${ORDERS_ENDPOINT}/new`, {
        body: [products, idUser, address, amount]
      })
        .then(data => {
          if (data === -1) return false;
          else return true;
        });
      return validation;
    } else return true;
  }

  return {
    handleAddProduct,
    handleRemoveProduct,
    handleAddSpecificNumberProduct,
    handleRemoveConfig,
    handleDeleteCartProduct,
    createOrder,
  }
}