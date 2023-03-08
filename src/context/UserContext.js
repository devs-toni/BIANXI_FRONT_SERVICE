import React, { createContext, useContext, useReducer } from 'react'

const loginStorage = JSON.parse(localStorage.getItem('LOGIN_SUCCESS'));

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

  const init = {
    isLogged: loginStorage ? true : false,
    error: '',
    username: loginStorage ? loginStorage.username : '',
    id: loginStorage ? loginStorage.id : 0,
    orders: []
  }

  const USER_ACTIONS = {

    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    HANDLE_LIKE: "HANDLE_LIKE",
    RESET_ERROR: "RESET_ERROR",
    LOGOUT: "LOGOUT"
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case USER_ACTIONS.RESET_ERROR:
        return {
          isLogged: state.isLogged,
          error: '',
          username: state.username,
          id: state.id
        };

      case USER_ACTIONS.LOGIN_ERROR:
        return {
          isLogged: false,
          error: action.payload,
          username: '',
          id: 0
        };

      case USER_ACTIONS.LOGIN_SUCCESS:
        localStorage.setItem('LOGIN_SUCCESS', JSON.stringify({ id: action.payload.id, username: action.payload.username }));
        return {
          isLogged: true,
          error: '',
          username: action.payload.username,
          id: action.payload.id
        }

      case USER_ACTIONS.LOGOUT:
        localStorage.removeItem('LOGIN_SUCCESS')
        return {
          isLogged: false,
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
    return { state, dispatch, USER_ACTIONS }
  }

  const data = { handleUser }

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  )
}