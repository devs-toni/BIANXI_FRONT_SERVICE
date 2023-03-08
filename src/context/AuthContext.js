import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { USERS_ENDPOINT } from '../configuration';
import { http } from '../helpers/http';


const authStorage = JSON.parse(localStorage.getItem('AUTH'));

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const initialState = {
    isAuthenticated: authStorage ? true : false,
    id: authStorage ? authStorage.id : 0,
    username: authStorage ? authStorage.username : '',
    role: authStorage ? authStorage.role : '',
    error: '',
    oAuth: null,
    profile: null
  }

  const USER_ACTIONS = {

    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    HANDLE_LIKE: "HANDLE_LIKE",
    RESET_ERROR: "RESET_ERROR",
    LOGOUT: "LOGOUT",
    SET_OAUTH: "SET_OAUTH",
    SET_PROFILE: "SET_PROFILE"
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case USER_ACTIONS.RESET_ERROR:
        return {
          ...state,
          error: '',
        };

      case USER_ACTIONS.LOGIN_ERROR:
        return {
          isAuthenticated: false,
          id: 0,
          username: '',
          role: '',
          error: action.payload,
          oAuth: null,
          profile: null,
        };

      case USER_ACTIONS.LOGIN_SUCCESS:
        return {
          isAuthenticated: true,
          id: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          error: '',
          oAuth: null,
          profile: null,
        }

      case USER_ACTIONS.LOGOUT:
        return {
          oAuth: null,
          profile: null,
          isAuthenticated: false,
          id: 0,
          username: '',
          role: '',
          error: '',
        }

      case USER_ACTIONS.SET_OAUTH:
        return {
          isAuthenticated: true,
          id: 0,
          username: '',
          role: 'U',
          error: '',
          oAuth: action.payload,
          profile: null
        }

      case USER_ACTIONS.SET_PROFILE:
        return {
          isAuthenticated: true,
          id: action.payload.id,
          username: action.payload.name,
          role: 'U',
          error: '',
          oAuth: state.oAuth,
          profile: action.payload
        }

      default:
        return state;
    }
  }

  const [user_state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((id, username, role, error) => {
    if (!error) {
      dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: { id, username, role } })
      localStorage.setItem('AUTH', JSON.stringify({ isAuthenticated: true, id, username, role }));
    } else
      dispatch({ type: USER_ACTIONS.LOGIN_ERROR, payload: error })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: USER_ACTIONS.RESET_ERROR })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('AUTH');
    dispatch({ type: USER_ACTIONS.LOGOUT })
  }, []);

  const oAuthLogin = useCallback((response) => {
    dispatch({ type: USER_ACTIONS.SET_OAUTH, payload: response })
    http()
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        setProfileOAuth(res);
      })
      .catch((err) => console.err(err));
  }, []);

  const setProfileOAuth = useCallback(async (profile) => {
    dispatch({ type: USER_ACTIONS.SET_PROFILE, payload: profile })
    const { name, id } = profile;
    const validation = await saveUser(name, id);
    validation && login(validation.id, name, 'U', '');
    localStorage.setItem('AUTH', JSON.stringify({ isAuthenticated: true, id: validation.id, username: name, role: 'U' }));
  }, []);

  const saveUser = async (username, password) => {
    const user = { email: username, role: "U", password }
    const response = await http().post(`${USERS_ENDPOINT}/save`, {
      body: user
    })
      .then(data => {
        if (data) return data;
        else return false;
      });
      return response;
  }

  const data = useMemo(() => ({
    user_state,
    login,
    logout,
    reset,
    oAuthLogin,
    setProfileOAuth
  }), [login, logout, reset, oAuthLogin, setProfileOAuth, user_state])

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}