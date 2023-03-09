import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { addLike, deleteLike } from '../helpers/server';
import { setProductPrice } from '../helpers/utils';
import { ACTIONS } from '../types';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {

  const { userState } = useAuth();

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

      case ACTIONS.SET_PRODUCT:
        return { ...state, product: action.payload };

      case ACTIONS.SET_COLOR:
        return { ...state, color: action.payload };

      case ACTIONS.SET_COLORS:
        return { ...state, colors: action.payload }

      case ACTIONS.SET_SIZE:
        return { ...state, size: action.payload };

      case ACTIONS.SET_SIZES:
        return { ...state, sizes: action.payload };

      case ACTIONS.SET_PRICES:
        return { ...state, updatedPrices: setProductPrice(action.payload.offer, action.payload.price) };

      case ACTIONS.SET_EMPTY_PRODUCT:
        return { ...state, empty: true };

      case ACTIONS.SET_CONFIG:
        return { ...state, config: action.payload };

      case ACTIONS.HANDLE_LIKE:
        if (state.like) deleteLike(state.product.id, userState.id);
        else addLike(state.product.id, userState.id);

        return { ...state, like: !state.like }

      case ACTIONS.LIKE_FALSE:
        return { ...state, like: false };

      case ACTIONS.LIKE_TRUE:
        return { ...state, like: true };

      default:
        return state;
    }
  }
  const [productState, dispatch] = useReducer(reducer, init);

  const setProduct = useCallback(() => {

  }, [])
  const setColor = useCallback(() => {

  }, [])
  const setSize = useCallback(() => {

  }, [])
  const setSizes = useCallback(() => {

  }, [])
  const setColors = useCallback(() => {

  }, [])
  const setPrices = useCallback(() => {

  }, [])
  const setEmptyProduct = useCallback(() => {

  }, [])
  const setConfig = useCallback(() => {

  }, [])
  const handleLike = useCallback(() => {

  }, [])
  const setLikeFalse = useCallback(() => {

  }, [])
  const setLikeTrue = useCallback(() => {

  }, [])

  const data = useMemo(() => ({
    productState,
    setProduct,
    setColor,
    setSize,
    setSizes,
    setColors,
    setPrices,
    setEmptyProduct,
    setConfig,
    handleLike,
    setLikeFalse,
    setLikeTrue
  }), [productState,
    setProduct,
    setColor,
    setSize,
    setSizes,
    setColors,
    setPrices,
    setEmptyProduct,
    setConfig,
    handleLike,
    setLikeFalse,
    setLikeTrue])
  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext