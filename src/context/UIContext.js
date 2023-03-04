import React, { createContext, useContext, useEffect, useReducer } from 'react';

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
  }

  const initialState = {
    loginIsOpen: false,
    menuIsOpen: false,
    cartIsOpen: false
  }

  const UiReducer = (state, action) => {
    switch (action.type) {

      case UI_ACTIONS.HANDLE_LOGIN:
        return { loginIsOpen: !state.loginIsOpen };

      case UI_ACTIONS.CLOSE_LOGIN:
        return { loginIsOpen: state.loginIsOpen ? false : '' };

      case UI_ACTIONS.HANDLE_MENU:
        return { menuIsOpen: !state.menuIsOpen };

      case UI_ACTIONS.CLOSE_MENU:
        return { menuIsOpen: state.menuIsOpen ? false : '' };

      case UI_ACTIONS.HANDLE_CART:
        return { cartIsOpen: !state.cartIsOpen };

      case UI_ACTIONS.CLOSE_CART:
        return { cartIsOpen: state.cartIsOpen ? false : '' };

      default:
        break;
    }
  }
  const [state, dispatch] = useReducer(UiReducer, initialState);

  const handleUi = () => {
    return { state, dispatch };
  }

  useEffect(() => {
    if (state.cartIsOpen) {
      document.getElementById('root').style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.getElementById('root').style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [state.cartIsOpen]);


  const data = {
    UI_ACTIONS,
    handleUi
  }

  return (
    <UIContext.Provider value={data}>{children}</UIContext.Provider>
  )
}

export default UIProvider;