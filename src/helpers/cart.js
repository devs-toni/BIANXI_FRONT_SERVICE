import { ordersUrl } from "../config";
import { http } from "./http";
import { addConfigurationToProduct, addProductToCart, removeConfigInProduct, updateConfigurationStock, updateProductTotal } from "./utils";

export const CartMainMethods = (product_state) => {

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
    const validation = http().post(`${ordersUrl}/new`, {
      body: [products, idUser, address, amount]
    })
      .then(data => {
        console.log("Id de la nueva orden creada" + data);
        if (data === -1) return false;
        else return true;
      });
    return validation;
  }

  /*   const findNumberProduct = id => {
      return state.cartProducts.find(p => p.id === id)?.total;
    } */


  /*   const getProduct = (id) => {
      return state.cartProducts[getIndexProduct(id)];
    } */

  return {
    handleAddProduct,
    handleRemoveProduct,
    handleAddSpecificNumberProduct,
    handleRemoveConfig,
    handleDeleteCartProduct,
    createOrder
  }
}

//TOTAL CHARGE IN CART
export const getTotalPriceCart = (products) => {
  let total = 0;
  products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
  return total;
}

export const getIVAPriceCart = (products) => {
  let total = 0;
  products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
  return (total * 21) / 100;
}
