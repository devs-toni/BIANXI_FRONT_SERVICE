import { createContext, useContext, useReducer } from "react";
import { useProduct } from "./ProductContext";
import { CartMainMethods } from "../helpers/cart";
import { useUser } from "./UserContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
}

const items = JSON.parse(localStorage.getItem('CART'));

export const CartProvider = ({ children }) => {

  const { handleProduct } = useProduct();
  const { state: product_state } = handleProduct();

  const { handleUser } = useUser();
  const { state: user_state } = handleUser();

  const {
    handleAddProduct,
    handleRemoveProduct,
    handleAddSpecificNumberProduct,
    handleRemoveConfig,
    handleDeleteCartProduct,
    createOrder
  } = CartMainMethods(product_state);

  const CART_ACTIONS = {
    SET_CART_PRODUCTS: "SET_CART_PRODUCTS",
    ADD_ONE_PRODUCT: "ADD_ONE_PRODUCT",
    ADD_PRODUCTS: "ADD_PRODUCTS",
    DELETE_ONE_PRODUCT: "DELETE_ONE_PRODUCT",
    DELETE_CONFIGURATION: "DELETE_CONFIGURATION",
    DELETE_COMPLETE_PRODUCT: "DELETE_COMPLETE_PRODUCT",
    PAYMENT_SUCCESS: "PAYMENT_SUCCESS"
  }

  const initialState = {
    cartProducts: items ? items : [],
  }

  const reducer = (state, action) => {
    switch (action.type) {

      //SUM PRODUCT IN CART MODAL
      case CART_ACTIONS.ADD_ONE_PRODUCT:
        const { productAdd, configurationAdd } = action.payload;
        const productsAdd = handleAddProduct(productAdd, configurationAdd, state.cartProducts);
        localStorage.setItem("CART", JSON.stringify(productAdd));
        return { cartProducts: productsAdd };

      //REST PRODUCT IN CART MODAL
      case CART_ACTIONS.DELETE_ONE_PRODUCT:
        const { productDel, configurationDel } = action.payload;
        const productsDel = handleRemoveProduct(productDel, configurationDel, state.cartProducts);
        localStorage.setItem("CART", JSON.stringify(productsDel));
        return { cartProducts: productsDel };

      //ADD PRODUCTS IN PRODUCT PAGE
      case CART_ACTIONS.ADD_PRODUCTS:
        const { item, n } = action.payload;
        const productsAddN = handleAddSpecificNumberProduct(item, n, state.cartProducts);
        localStorage.setItem("CART", JSON.stringify(productsAddN));
        return { cartProducts: productsAddN };

      //DELETE CONFIGURATION IN CART MODAL
      case CART_ACTIONS.DELETE_CONFIGURATION:
        const { idProduct, idConf, totalProductInConf } = action.payload;
        const productsConfDel = handleRemoveConfig(idProduct, idConf, totalProductInConf, state.cartProducts);
        localStorage.setItem("CART", JSON.stringify(productsConfDel));
        return { cartProducts: productsConfDel };

      //DELETE PRODUCT IN CART MODAL
      case CART_ACTIONS.DELETE_COMPLETE_PRODUCT:
        const id = action.payload;
        const productsCompleteDel = handleDeleteCartProduct(id, state.cartProducts);
        localStorage.setItem("CART", JSON.stringify(productsCompleteDel));
        return { cartProducts: productsCompleteDel };

      case CART_ACTIONS.PAYMENT_SUCCESS:
        const result = createOrder(
          state.cartProducts.map(p => p.id),
          user_state.id,
          action.payload.form.address,
          action.payload.price
        );
        if (result) {
          localStorage.removeItem("CART");
          return { cartProducts: [] }
        } else return state;
        
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCart = () => {
    return { state, dispatch, CART_ACTIONS };
  }

  const data = { handleCart }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
