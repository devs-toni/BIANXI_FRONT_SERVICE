import React, { createContext, useContext, useReducer } from 'react';

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
  }

  const initialState = {
    loginIsOpen: false,
    menuIsOpen: false,
    cartIsOpen: false,
    searchIsOpen: false
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
        return { ...state, searchIsOpen: !state.searchIsOpen };

      case UI_ACTIONS.CLOSE_SEARCH:
        return { ...state, searchIsOpen: state.searchIsOpen && false };

      default:
        break;
    }
  }
  const [state, dispatch] = useReducer(UiReducer, initialState);

  const handleUi = () => {
    return { state, dispatch };
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

  const data = {
    UI_ACTIONS,
    handleUi
  }

  return (
    <UIContext.Provider value={data}>{children}</UIContext.Provider>
  )
}

export default UIProvider;