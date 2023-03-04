import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'


const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {


  const init = {
    logged: false,
    error: '',
    username: '',
  }

  const USER_ACTIONS = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT",
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case USER_ACTIONS.LOGIN_ERROR:
        return {
          logged: false,
          username: '',
          error: action.payload
        };

      case USER_ACTIONS.LOGIN_SUCCESS:
        return {
          logged: true,
          error: '',
          username: action.payload
        }
      case USER_ACTIONS.LOGOUT:
        return {
          logged: false,
          error: '',
          username: ''
        }
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, init);

  const handleUser = () => {
    return { state, dispatch }
  }

  const data = {
    USER_ACTIONS,
    handleUser
  }

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  )
}