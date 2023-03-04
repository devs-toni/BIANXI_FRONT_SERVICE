import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { productsUrl } from '../config';
import { Connection } from '../helpers/HTTP_Connection';
import { setProductPrice } from '../helpers/utils';
import { useUser } from './UserContext';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {


  const { USER_ACTIONS, handleUser } = useUser();
  const { state: user_state, dispatch: user_dispatch } = handleUser();

  const addLike = (idProduct, idUser) => {
    const { post } = Connection();
    post(`${productsUrl}/like/add`, {
      body: {
        product: idProduct,
        user: idUser
      }
    }).then(data => {
      console.log(data);
    })
  }

  const PRODUCT_ACTIONS = {
    SET_PRODUCT: "SET_PRODUCT",
    SET_COLOR: "SET_COLOR",
    SET_SIZE: "SET_SIZE",
    SET_PRICES: "SET_PRICES",
    SET_EMPTY_PRODUCT: "SET_EMPTY_PRODUCT",
    SET_CONFIG: "SET_CONFIG",
    HANDLE_LIKE: "HANDLE_LIKE"
  }

  const init = {
    product: null,
    config: null,
    color: 0,
    size: '',
    updatedPrices: '',
    empty: false,
    like: false
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case PRODUCT_ACTIONS.SET_PRODUCT:
        return { ...state, product: action.payload.product };
      case PRODUCT_ACTIONS.SET_COLOR:
        return { ...state, color: action.payload.color };
      case PRODUCT_ACTIONS.SET_SIZE:
        return { ...state, size: action.payload };
      case PRODUCT_ACTIONS.SET_PRICES:
        return { ...state, updatedPrices: setProductPrice(action.payload.offer, action.payload.price) };
      case PRODUCT_ACTIONS.SET_EMPTY_PRODUCT:
        return { ...state, empty: true };
      case PRODUCT_ACTIONS.SET_CONFIG:
        return { ...state, config: action.payload };
      case PRODUCT_ACTIONS.HANDLE_LIKE:
        addLike(state.product.id, user_state.id);
        return { ...state, like: !state.like }

      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, init);

  const configureProduct = () => {
    return { state, dispatch };
  }

  useEffect(() => {
    const { product } = state;
    if (product?.configuration) {
      dispatch({ type: PRODUCT_ACTIONS.SET_PRICES, payload: { offer: product.offer, price: product.price } });
    }
  }, [state.product]);

  const data = {
    PRODUCT_ACTIONS,
    configureProduct
  }

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext