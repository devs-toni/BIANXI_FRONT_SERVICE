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

  //TOTAL CHARGE IN CART
  const getTotalPriceCart = useCallback((products) => {
    let total = 0;
    products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return total;
  }, []);

  const { handleProduct } = useProduct();
  const { state: product_state } = handleProduct();
  const { user_state } = useAuth();

  const [cartProducts, setCartProducts] = useState(items ? items : []);
  const [activeCupon, setActiveCupon] = useState(false);
  const [totalAmount, setTotalAmount] = useState(items ? getTotalPriceCart(items) : 0);

  const getMethods = useCallback(() => {
    return getMainMethods(product_state);
  }, [product_state]);

  //SUM PRODUCT IN CART MODAL
  const addOneProduct = useCallback((productAdd, configurationAdd) => {
    const { handleAddProduct } = getMethods();
    const productsAdd = handleAddProduct(productAdd, configurationAdd, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAdd));
    setCartProducts(productsAdd);
    setTotalAmount(getTotalPriceCart(productsAdd));
  }, []);

  //REST PRODUCT IN CART MODAL
  const deleteOneProduct = useCallback((productDel, configurationDel) => {
    const { handleRemoveProduct } = getMethods();
    const productsDel = handleRemoveProduct(productDel, configurationDel, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsDel));
    setCartProducts(productsDel);
    setTotalAmount(getTotalPriceCart(productsDel));

  }, []);

  //ADD PRODUCTS IN PRODUCT PAGE
  const addProducts = useCallback((item, n) => {
    const { handleAddSpecificNumberProduct } = getMethods();
    const productsAddN = handleAddSpecificNumberProduct(item, n, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAddN));
    setCartProducts(productsAddN);
    setTotalAmount(getTotalPriceCart(productsAddN));
  }, [product_state]);

  //DELETE CONFIGURATION IN CART MODAL
  const deleteConfiguration = useCallback((idProduct, idConf, totalProductInConf) => {
    const { handleRemoveConfig } = getMethods();
    const productsConfDel = handleRemoveConfig(idProduct, idConf, totalProductInConf, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsConfDel));
    setCartProducts(productsConfDel);
    setTotalAmount(getTotalPriceCart(productsConfDel));
  }, []);

  //DELETE PRODUCT IN CART MODAL
  const deleteCompleteProduct = useCallback((id) => {
    const { handleDeleteCartProduct } = getMethods();
    const productsCompleteDel = handleDeleteCartProduct(id, cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsCompleteDel));
    setCartProducts(productsCompleteDel);
    setTotalAmount(getTotalPriceCart(productsCompleteDel));
  }, []);


  const successPayment = useCallback(async (form, price, products) => {
    const { createOrder } = getMethods();
    const customerOrder = user_state.isAuthenticated ? user_state.id : null;
    const result = await createOrder(
      products.map(p => {
        return p.id;
      }),
      customerOrder,
      form.address,
      price
    );
    if (result) {
      localStorage.removeItem("CART");
      setCartProducts([]);
      setTotalAmount(getTotalPriceCart(0));

    }
  }, [user_state]);

  //SET ACTIVE CUPON
  const handleCupon = useCallback((state, percentage) => {
    setActiveCupon(state);
    const discount = ((totalAmount * percentage) / 100);
    state ? setTotalAmount(prevState => prevState - discount) : setTotalAmount(getTotalPriceCart(cartProducts));
  }, []);

  const getIVAPriceCart = useCallback((products) => {
    let total = 0;
    products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return (total * 21) / 100;
  }, [])

  const data = useMemo(() => ({
    cartProducts,
    activeCupon,
    addOneProduct,
    deleteOneProduct,
    addProducts,
    deleteConfiguration,
    deleteCompleteProduct,
    successPayment,
    getIVAPriceCart,
    getTotalPriceCart,
    handleCupon
  }), [cartProducts, addOneProduct, deleteOneProduct, addProducts, deleteConfiguration, deleteCompleteProduct, successPayment, getIVAPriceCart, getTotalPriceCart, handleCupon, activeCupon])

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}