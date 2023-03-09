import React, { createContext, useContext, useReducer, useRef } from 'react';

const UIContext = createContext();

export const useUI = () => {
  return useContext(UIContext);
}

export const UIProvider = ({ children }) => {

  const UI_ACTIONS = {
    HANDLE_LOGIN: "OPEN_LOGIN",
    CLOSE_LOGIN: "CLOSE_LOGIN",

    HANDLE_MENU: "HANDLE_MENU",
    CLOSE_MENU: "CLOSE_MENU",

    HANDLE_CART: "HANDLE_CART",
    CLOSE_CART: "CLOSE_CART",

    HANDLE_SEARCH: "HANDLE_SEARCH",
    CLOSE_SEARCH: "CLOSE_SEARCH",

    HANDLE_CUPON: "HANDLE_CUPON",
    CLOSE_CUPON: "CLOSE_CUPON",
  }

  const initialState = {
    loginIsOpen: false,
    menuIsOpen: false,
    cartIsOpen: false,
    searchIsOpen: false,
    searchRef: useRef(null),
    cuponIsOpen: false,
  }

  const UiReducer = (state, action) => {
    switch (action.type) {

      case UI_ACTIONS.HANDLE_LOGIN:
        return { ...state, loginIsOpen: !state.loginIsOpen };

      case UI_ACTIONS.CLOSE_LOGIN:
        return { ...state, loginIsOpen: state.loginIsOpen && false };

      case UI_ACTIONS.HANDLE_MENU:
        return { ...state, menuIsOpen: !state.menuIsOpen };

      case UI_ACTIONS.CLOSE_MENU:
        return { ...state, menuIsOpen: state.menuIsOpen && false };

      case UI_ACTIONS.HANDLE_CART:
        return { ...state, cartIsOpen: !state.cartIsOpen };

      case UI_ACTIONS.CLOSE_CART:
        return { ...state, cartIsOpen: state.cartIsOpen && false };

      case UI_ACTIONS.HANDLE_SEARCH:
        !state.searchIsOpen && state.searchRef.current.focus();
        return { ...state, searchIsOpen: !state.searchIsOpen };

      case UI_ACTIONS.CLOSE_SEARCH:
        return { ...state, searchIsOpen: state.searchIsOpen && false };

      case UI_ACTIONS.HANDLE_CUPON:
        return { ...state, cuponIsOpen: !state.cuponIsOpen };

      case UI_ACTIONS.CLOSE_CUPON:
        return { ...state, cuponIsOpen: state.cuponIsOpen && false };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(UiReducer, initialState);

  const handleUi = () => {
    return { state, dispatch, UI_ACTIONS };
  }

  /*     const clickOutsideHandler = event => {
      if (menuRef.current) {
        if (
          menuRef.current.contains(event.target) ||
          activatorRef.current.contains(event.target)
        ) {
          return;
        }
        //setIsNavShow(false);
      }
    }; */

  const data = { handleUi }

  return (
    <UIContext.Provider value={data}>{children}</UIContext.Provider>
  )
}

export default UIProvider;