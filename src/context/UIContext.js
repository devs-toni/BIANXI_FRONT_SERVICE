import React, { createContext, useContext } from 'react';

const UIContext = createContext();

export const useUI = () => {
  return useContext(UIContext);
}

export const UIProvider = ({ children }) => {

  const ACTIONS = {
    HANDLE_LOGIN: "OPEN_LOGIN",
    CLOSE_LOGIN: "CLOSE_LOGIN"
  }
  
  const initialState = {
    loginOpen: false,
  }

  function UiReducer(state, action) {
    switch(action.type) {

    }
  }

  const data = {

  }
  return (
    <UIContext.Provider value={data}>{children}</UIContext.Provider>
  )
}

export default UIProvider;