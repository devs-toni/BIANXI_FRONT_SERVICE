import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useProduct } from "./ProductContext";
import { useAuth } from "./AuthContext";
import { getMainMethods } from "../helpers/cart";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
}

const items = JSON.parse(localStorage.getItem('CART'));

export const CartProvider = ({ children }) => {

  const { handleProduct } = useProduct();
  const { state: product_state } = handleProduct();
  const { user_state } = useAuth();

  const [cartProducts, setCartProducts] = useState(items ? items : [])

  const getMethods = useCallback(() => {
    return getMainMethods(product_state);
  }, [product_state]);

  //SUM PRODUCT IN CART MODAL
  const addOneProduct = useCallback((productAdd, configurationAdd) => {
    const { handleAddProduct } = getMethods();
    const productsAdd = handleAddProduct(productAdd, configurationAdd, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAdd));
    setCartProducts(productsAdd);
  }, []);

  //REST PRODUCT IN CART MODAL
  const deleteOneProduct = useCallback((productDel, configurationDel) => {
    const { handleRemoveProduct } = getMethods();
    const productsDel = handleRemoveProduct(productDel, configurationDel, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsDel));
    setCartProducts(productsDel);
  }, []);

  //ADD PRODUCTS IN PRODUCT PAGE
  const addProducts = useCallback((item, n) => {
    const { handleAddSpecificNumberProduct } = getMethods();
    const productsAddN = handleAddSpecificNumberProduct(item, n, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAddN));
    setCartProducts(productsAddN);
  }, [product_state]);

  //DELETE CONFIGURATION IN CART MODAL
  const deleteConfiguration = useCallback((idProduct, idConf, totalProductInConf) => {
    const { handleRemoveConfig } = getMethods();
    const productsConfDel = handleRemoveConfig(idProduct, idConf, totalProductInConf, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsConfDel));
    setCartProducts(productsConfDel);
  }, []);

  //DELETE PRODUCT IN CART MODAL
  const deleteCompleteProduct = useCallback((id) => {
    const { handleDeleteCartProduct } = getMethods();
    const productsCompleteDel = handleDeleteCartProduct(id, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsCompleteDel));
    setCartProducts(productsCompleteDel);
  }, []);


  const successPayment = useCallback((form, price) => {
    const { createOrder } = getMethods();
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