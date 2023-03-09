import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useProduct } from "./ProductContext";
import { useAuth } from "./AuthContext";
import { getMainMethods } from "../helpers/cart";
import { ACTIONS } from "../types";
import { http } from "../helpers/http";
import { NEW_USER_DISCOUNT, ORDERS_ENDPOINT } from "../configuration";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
}

const items = JSON.parse(localStorage.getItem('CART'));

export const CartProvider = ({ children }) => {

  const { productState } = useProduct();
  const { userState } = useAuth();

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


  const initialState = {
    cartProducts: items ? items : [],
    activeCupon: false,
    discountCupon: 0,
    isNew: false,
    discountNew: 0,
    totalAmount: items ? getTotalPriceCart(items) : 0,
    iva: items ? getIVAPriceCart(items) : 0,
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case ACTIONS.MODIFY_PRODUCTS:
        return {
          ...state,
          cartProducts: action.payload,
          totalAmount: getTotalPriceCart(action.payload),
          iva: getIVAPriceCart(action.payload),
          discountNew: state.isNew ? (getTotalPriceCart(action.payload) * NEW_USER_DISCOUNT) / 100 : 0,
        };

      case ACTIONS.HANDLE_CUPON:
        return {
          ...state,
          activeCupon: action.payload.active,
          totalAmount: action.payload.amount,
          iva: action.payload.iva ? action.payload.iva : getIVAPriceCart(state.cartProducts),
          discountCupon: action.payload.discount,
        };

      case ACTIONS.SET_NEW_USER_DISCOUNT:
        console.log(action.payload);
        return {
          ...state,
          isNew: action.payload.isNew,
          discountNew: action.payload.discount,
          totalAmount: action.payload.amount
        }

      default: return state;
    }
  }

  const [cartState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isNewUser = async () => {
      await http().get(`${ORDERS_ENDPOINT}/get/all/${userState.id}`)
        .then(data => {
          const y = data.length === 0;
          console.log(data);
          console.log(userState.id);
          console.log(y);
          if (items && y) {
            const discountNew = (cartState.totalAmount * NEW_USER_DISCOUNT) / 100;
            const finalPrice = cartState.totalAmount - discountNew;
            if (userState.id !== 0)
              dispatch({ type: ACTIONS.SET_NEW_USER_DISCOUNT, payload: { isNew: y, discount: discountNew, amount: finalPrice } })
            else
              dispatch({ type: ACTIONS.SET_NEW_USER_DISCOUNT, payload: { isNew: false, discount: 0, amount: cartState.totalAmount } })
          }
        });
    }
    isNewUser();
  }, [userState.isAuthenticated])

  const getMethods = useCallback(() => {
    return getMainMethods(productState);
  }, [productState]);


  //SUM PRODUCT IN CART MODAL
  const addOneProduct = useCallback((productAdd, configurationAdd) => {
    const { handleAddProduct } = getMethods();
    const productsAdd = handleAddProduct(productAdd, configurationAdd, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAdd));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsAdd });
  }, [cartState.cartProducts, getMethods]);

  //REST PRODUCT IN CART MODAL
  const deleteOneProduct = useCallback((productDel, configurationDel) => {
    const { handleRemoveProduct } = getMethods();
    const productsDel = handleRemoveProduct(productDel, configurationDel, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsDel));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsDel });
  }, [cartState.cartProducts, getMethods]);

  //ADD PRODUCTS IN PRODUCT PAGE
  const addProducts = useCallback((item, n) => {
    const { handleAddSpecificNumberProduct } = getMethods();
    const productsAddN = handleAddSpecificNumberProduct(item, n, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsAddN));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsAddN });
  }, [productState, getMethods, cartState.cartProducts]);

  //DELETE CONFIGURATION IN CART MODAL
  const deleteConfiguration = useCallback((idProduct, idConf, totalProductInConf) => {
    const { handleRemoveConfig } = getMethods();
    const productsConfDel = handleRemoveConfig(idProduct, idConf, totalProductInConf, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsConfDel));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsConfDel });
  }, [cartState.cartProducts, getMethods]);

  //DELETE PRODUCT IN CART MODAL
  const deleteCompleteProduct = useCallback((id) => {
    const { handleDeleteCartProduct } = getMethods();
    const productsCompleteDel = handleDeleteCartProduct(id, cartState.cartProducts);
    localStorage.setItem("CART", JSON.stringify(productsCompleteDel));
    dispatch({ type: ACTIONS.MODIFY_PRODUCTS, payload: productsCompleteDel });
  }, [cartState.cartProducts, getMethods]);

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
  }, [userState, getMethods]);

  //SET ACTIVE CUPON
  const handleCupon = useCallback((state, percentage) => {
    const saving = (cartState.totalAmount * percentage) / 100;
    const finalPrice = cartState.totalAmount - saving;
    if (state) {
      const iva = (finalPrice * 21 / 100);
      dispatch({ type: ACTIONS.HANDLE_CUPON, payload: { amount: finalPrice, active: state, iva: iva, discount: saving } })
    } else
      dispatch({ type: ACTIONS.HANDLE_CUPON, payload: { amount: getTotalPriceCart(cartState.cartProducts), active: state, iva: getIVAPriceCart(cartState.cartProducts), discount: 0 } });
  }, [cartState, getTotalPriceCart]);

  const data = useMemo(() => ({
    cartState,
    addOneProduct,
    deleteOneProduct,
    addProducts,
    deleteConfiguration,
    deleteCompleteProduct,
    successPayment,
    handleCupon
  }), [cartState, addOneProduct, deleteOneProduct, addProducts, deleteConfiguration, deleteCompleteProduct, successPayment, handleCupon])

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}