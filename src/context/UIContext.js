import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import { ACTIONS } from '../config/types';

const UIContext = createContext();

export const useUI = () => {
  return useContext(UIContext);
}

export const UIProvider = ({ children }) => {

  const initialState = {
    loginIsOpen: false,
    menuIsOpen: false,
    cartIsOpen: false,
    searchIsOpen: false,
    searchRef: useRef(null),
    cuponIsOpen: false,
    filterIsOpen: false
  }

  const UiReducer = (state, action) => {
    switch (action.type) {

      case ACTIONS.HANDLE_LOGIN:
        return {
          ...state,
          loginIsOpen: !state.loginIsOpen
        };

      case ACTIONS.CLOSE_LOGIN:
        return {
          ...state,
          loginIsOpen: state.loginIsOpen && false
        };

      case ACTIONS.HANDLE_MENU:
        return {
          ...state,
          menuIsOpen: !state.menuIsOpen
        };

      case ACTIONS.CLOSE_MENU:
        return {
          ...state,
          menuIsOpen: state.menuIsOpen && false
        };

      case ACTIONS.HANDLE_CART:
        return {
          ...state,
          cartIsOpen: !state.cartIsOpen
        };

      case ACTIONS.CLOSE_CART:
        return {
          ...state,
          cartIsOpen: state.cartIsOpen && false
        };

      case ACTIONS.HANDLE_SEARCH:
        !state.searchIsOpen && state.searchRef.current.focus();
        return {
          ...state,
          searchIsOpen: !state.searchIsOpen
        };

      case ACTIONS.CLOSE_SEARCH:
        return {
          ...state,
          searchIsOpen: state.searchIsOpen && false
        };

      case ACTIONS.HANDLE_CUPON:
        return {
          ...state,
          cuponIsOpen: !state.cuponIsOpen
        };

      case ACTIONS.CLOSE_CUPON:
        return {
          ...state,
          cuponIsOpen: state.cuponIsOpen && false
        };

      case ACTIONS.HANDLE_FILTER:
        return {
          ...state,
          filterIsOpen: !state.filterIsOpen
        };

      case ACTIONS.CLOSE_FILTER:
        return {
          ...state,
          filterIsOpen: state.filterIsOpen && false
        };

      default:
        return state;
    }
  }
  const [uiState, dispatch] = useReducer(UiReducer, initialState);

  const manageSection = useCallback((section, handler) => {
    const handle = handler === "handle" ? true : false;
    switch (section) {
      case "menu":
        return handle ? ACTIONS.HANDLE_MENU : ACTIONS.CLOSE_MENU;

      case "login":
        return handle ? ACTIONS.HANDLE_LOGIN : ACTIONS.CLOSE_LOGIN;

      case "search":
        return handle ? ACTIONS.HANDLE_SEARCH : ACTIONS.CLOSE_SEARCH;

      case "cart":
        return handle ? ACTIONS.HANDLE_CART : ACTIONS.CLOSE_CART;

      case "cupon":
        return handle ? ACTIONS.HANDLE_CUPON_UI : ACTIONS.CLOSE_CUPON;

      case "filter":
        return handle ? ACTIONS.HANDLE_FILTER : ACTIONS.CLOSE_FILTER;

      default:
        break;
    }
  }, []);

  const handleUi = useCallback((section, handler) => {
    const action = manageSection(section, handler);
    dispatch({ type: action })
  }, []);

  const data = useMemo(() => ({
    uiState,
    handleUi
  }), [uiState, handleUi])

  return (
    <UIContext.Provider value={data}>{children}</UIContext.Provider>
  )
}

export default UIProvider;