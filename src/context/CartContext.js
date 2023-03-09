import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { useProduct } from "./ProductContext";
import { useAuth } from "./AuthContext";
import { getMainMethods } from "../helpers/cart";
import { ACTIONS } from "../types";

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

  const initialState = {
    cartProducts: items ? items : [],
    activeCupon: false,
    totalAmount: items ? getTotalPriceCart(items) : 0
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case ACTIONS.MODIFY_PRODUCTS:
        return {
          ...state,
          cartProducts: action.payload,
          totalAmount: getTotalPriceCart(action.payload)
        };

      case ACTIONS.HANDLE_CUPON:
        return {
          ...state,
          activeCupon: action.payload.active,
          totalAmount: action.payload.amount
        };

      default: return state;
    }
  }

  const [cartState, dispatch] = useReducer(reducer, initialState);

  const { productState } = useProduct();

  const { userState } = useAuth();

  const getMethods = useCallback(() => {
    return getMainMethods(productState);
  }, [productState]);


  //SUM PRODUCT IN CART MODAL
  const addOneProduct = useCallback((productAdd, configurationAdd) => {
    const { handleAddProduct } = getMethods();
    const productsAdd = handleAddProduct(productAdd, configurationAdd, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAdd));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsAdd });
  }, []);

  //REST PRODUCT IN CART MODAL
  const deleteOneProduct = useCallback((productDel, configurationDel) => {
    const { handleRemoveProduct } = getMethods();
    const productsDel = handleRemoveProduct(productDel, configurationDel, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsDel));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsDel });
  }, []);

  //ADD PRODUCTS IN PRODUCT PAGE
  const addProducts = useCallback((item, n) => {
    const { handleAddSpecificNumberProduct } = getMethods();
    const productsAddN = handleAddSpecificNumberProduct(item, n, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAddN));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsAddN });
  }, [productState]);

  //DELETE CONFIGURATION IN CART MODAL
  const deleteConfiguration = useCallback((idProduct, idConf, totalProductInConf) => {
    const { handleRemoveConfig } = getMethods();
    const productsConfDel = handleRemoveConfig(idProduct, idConf, totalProductInConf, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsConfDel));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsConfDel });
  }, []);

  //DELETE PRODUCT IN CART MODAL
  const deleteCompleteProduct = useCallback((id) => {
    const { handleDeleteCartProduct } = getMethods();
    const productsCompleteDel = handleDeleteCartProduct(id, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsCompleteDel));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsCompleteDel });
  }, []);

  //PAYMENT COMPLETED
  const successPayment = useCallback(async (form, price, products) => {
    const { createOrder } = getMethods();
    const customerOrder = userState.isAuthenticated ? userState.id : null;
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
      dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: [] });
    }
  }, [userState]);

  //SET ACTIVE CUPON
  const handleCupon = useCallback((state, percentage) => {
    const discount = cartState.totalAmount - ((cartState.totalAmount * percentage) / 100);
    if (state)
      dispatch({ type: ACTIONS.MODIFY_AMOUNT, payload: { amount: discount, active: state } })
    else
      dispatch({ type: ACTIONS.MODIFY_AMOUNT, payload: { amount: getTotalPriceCart(cartState.cartProducts), active: state } });
  }, []);

  const getIVAPriceCart = useCallback((products) => {
    let total = 0;
    products?.map(p => total += (parseFloat(`${p.final}`.replace('.', '')) * p.total));
    return (total * 21) / 100;
  }, [])

  const data = useMemo(() => ({
    cartState,
    addOneProduct,
    deleteOneProduct,
    addProducts,
    deleteConfiguration,
    deleteCompleteProduct,
    successPayment,
    getIVAPriceCart,
    handleCupon
  }), [cartState, addOneProduct, deleteOneProduct, addProducts, deleteConfiguration, deleteCompleteProduct, successPayment, getIVAPriceCart, handleCupon])

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}