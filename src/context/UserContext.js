import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const loginStorage = JSON.parse(localStorage.getItem('LOGIN_SUCCESS'));
console.log(loginStorage);

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

  const init = {
    logged: loginStorage ? true : false,
    error: '',
    username: loginStorage ? loginStorage.username : '',
    id: loginStorage ? loginStorage.id : 0
  }

  const USER_ACTIONS = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    HANDLE_LIKE: "HANDLE_LIKE",
    LOGOUT: "LOGOUT",
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case USER_ACTIONS.LOGIN_ERROR:
        return {
          logged: false,
          error: action.payload,
          username: '',
          id: 0
        };

      case USER_ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem('LOGIN_SUCCESS', JSON.stringify({ id: action.payload.id, username: action.payload.username }));
        return {
          logged: true,
          error: '',
          username: action.payload.username,
          id: action.payload.id
        }
      case USER_ACTIONS.LOGOUT:
        localStorage.removeItem('LOGIN_SUCCESS')
        return {
          logged: false,
          error: '',
          username: '',
          id: 0
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