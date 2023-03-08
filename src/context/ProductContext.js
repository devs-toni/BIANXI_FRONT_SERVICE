import React, { createContext, useContext, useReducer } from 'react';
import { addLike, deleteLike } from '../helpers/server';
import { setProductPrice } from '../helpers/utils';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {

  const { user_state } = useAuth();

  const PRODUCT_ACTIONS = {
    SET_PRODUCT: "SET_PRODUCT",
    SET_COLOR: "SET_COLOR",
    SET_COLORS: "SET_COLORS",
    SET_SIZE: "SET_SIZE",
    SET_SIZES: "SET_SIZES",
    SET_PRICES: "SET_PRICES",
    SET_EMPTY_PRODUCT: "SET_EMPTY_PRODUCT",
    SET_CONFIG: "SET_CONFIG",
    HANDLE_LIKE: "HANDLE_LIKE",
    LIKE_FALSE: "LIKE_FALSE",
    LIKE_TRUE: "LIKE_TRUE",
  }

  const init = {
    product: null,
    config: null,
    color: 0,
    colors: [],
    size: '',
    sizes: [],
    updatedPrices: {},
    empty: false,
    like: false
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case PRODUCT_ACTIONS.SET_PRODUCT:
        return { ...state, product: action.payload };

      case PRODUCT_ACTIONS.SET_COLOR:
        return { ...state, color: action.payload };

      case PRODUCT_ACTIONS.SET_COLORS:
        return { ...state, colors: action.payload }

      case PRODUCT_ACTIONS.SET_SIZE:
        return { ...state, size: action.payload };

      case PRODUCT_ACTIONS.SET_SIZES:
        return { ...state, sizes: action.payload };

      case PRODUCT_ACTIONS.SET_PRICES:
        return { ...state, updatedPrices: setProductPrice(action.payload.offer, action.payload.price) };

      case PRODUCT_ACTIONS.SET_EMPTY_PRODUCT:
        return { ...state, empty: true };

      case PRODUCT_ACTIONS.SET_CONFIG:
        return { ...state, config: action.payload };

      case PRODUCT_ACTIONS.HANDLE_LIKE:
        if (state.like) deleteLike(state.product.id, user_state.id);
        else addLike(state.product.id, user_state.id);

        return { ...state, like: !state.like }

      case PRODUCT_ACTIONS.LIKE_FALSE:
        return { ...state, like: false };

      case PRODUCT_ACTIONS.LIKE_TRUE:
        return { ...state, like: true };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, init);

  const handleProduct = () => {
    return { state, dispatch, PRODUCT_ACTIONS };
  }

  const data = { handleProduct }

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext