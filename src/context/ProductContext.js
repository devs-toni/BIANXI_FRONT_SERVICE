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


  const { handleUser } = useUser();
  const { state: user_state } = handleUser();

  const addLike = (idProduct, idUser) => {
    const { post } = Connection();
    post(`${productsUrl}/like/add`, {
      body: [
        idProduct, idUser
      ]
    }).then(data => {
      console.log(data);
    })
  }

  const deleteLike = (idProduct, idUser) => {
    const { del } = Connection();
    del(`${productsUrl}/like/delete`, {
      body: [
        idProduct, idUser
      ]
    }).then(data => {
      console.log(data);
    })
  }

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
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, init);

  const handleProduct = () => {
    return { state, dispatch, PRODUCT_ACTIONS };
  }

  useEffect(() => {
    const { product } = state;
    const { get } = Connection();

    if (product?.configuration) {
      dispatch({ type: PRODUCT_ACTIONS.SET_PRICES, payload: { offer: product.offer, price: product.price } });
    }
  }, [state.product]);

  useEffect(() => {
    const { product } = state;
    const { post } = Connection();

    if (state.product?.id) {
      post(`${productsUrl}/like/get`, {
        body: [
          state.product.id,
          user_state?.id,
        ]
      }).then(data => {
        console.log(data);
        data === 1
          ?
          dispatch({ type: PRODUCT_ACTIONS.LIKE_TRUE })
          :
          dispatch({ type: PRODUCT_ACTIONS.LIKE_FALSE })
      })
    }
  }, [state.product, user_state]);

  const data = { handleProduct }

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext