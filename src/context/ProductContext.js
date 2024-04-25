import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { PRODUCT_PROPERTIES } from '../config/configuration';
import { setProductPrice } from '../helpers/utils';
import { ACTIONS } from '../config/types';
import { useAuth } from './AuthContext';
import { useQueryAddLike, useQueryDeleteLike } from '../persistence/favourites';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {

  const { userState } = useAuth();

  const addLike = useQueryAddLike();
  const deleteLike = useQueryDeleteLike();

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
        return {
          ...state,
          product: action.payload
        };

      case ACTIONS.SET_COLOR:
        return {
          ...state,
          color: action.payload
        };

      case ACTIONS.SET_COLORS:
        return {
          ...state,
          colors: action.payload
        };

      case ACTIONS.SET_SIZE:
        return {
          ...state,
          size: action.payload
        };

      case ACTIONS.SET_SIZES:
        return {
          ...state,
          sizes: action.payload
        };

      case ACTIONS.SET_PRICES:
        return {
          ...state,
          updatedPrices: setProductPrice(action.payload.offer, action.payload.price)
        };

      case ACTIONS.SET_EMPTY_PRODUCT:
        return {
          ...state,
          empty: true
        };

      case ACTIONS.SET_CONFIG:
        return {
          ...state,
          config: action.payload
        };

      case ACTIONS.SET_LIKE:
        return {
          ...state,
          like: action.payload.newState
        };

      case ACTIONS.HANDLE_LIKE:
        return {
          ...state,
          like: !state.like
        };

      default:
        return state;
    }
  }
  const [productState, dispatch] = useReducer(reducer, init);

  const setProperty = (property, value) => {
    let action = managePropertySetter(property);


    if (property === PRODUCT_PROPERTIES.LIKE && !value) {
      if (productState.like) {
        deleteLike.mutate({
          idProduct: productState.product.id,
          idUser: userState.id
        });
      } else {
        addLike.mutate({
          idProduct: productState.product.id,
          idUser: userState.id
        });
      }
      action = ACTIONS.HANDLE_LIKE
    } else if (property === PRODUCT_PROPERTIES.LIKE && value) {
      action = ACTIONS.SET_LIKE
    }
    dispatch({ type: action, payload: value ? value : null })
  }

  const managePropertySetter = useCallback((property) => {
    switch (property) {
      case PRODUCT_PROPERTIES.PRODUCT:
        return ACTIONS.SET_PRODUCT;

      case PRODUCT_PROPERTIES.COLOR:
        return ACTIONS.SET_COLOR;

      case PRODUCT_PROPERTIES.SIZE:
        return ACTIONS.SET_SIZE;

      case PRODUCT_PROPERTIES.COLORS:
        return ACTIONS.SET_COLORS;

      case PRODUCT_PROPERTIES.SIZES:
        return ACTIONS.SET_SIZES;

      case PRODUCT_PROPERTIES.PRICES:
        return ACTIONS.SET_PRICES;

      case PRODUCT_PROPERTIES.EMPTY:
        return ACTIONS.SET_EMPTY_PRODUCT;

      case PRODUCT_PROPERTIES.CONFIG:
        return ACTIONS.SET_CONFIG;

      case PRODUCT_PROPERTIES.LIKE:
        return ACTIONS.SET_LIKE;

      default:
        break;
    }
  }, []);

  const data = {
    productState,
    setProperty,
  }
  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContext