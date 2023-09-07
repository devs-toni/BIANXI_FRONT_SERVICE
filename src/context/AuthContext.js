import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { USERS_ENDPOINT } from '../config/configuration';
import { http } from '../helpers/http';
import { ACTIONS } from '../config/types';


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
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case ACTIONS.RESET_ERROR:
        return {
          ...state,
          error: '',
        };

      case ACTIONS.LOGIN_ERROR:
        return {
          isAuthenticated: false,
          id: 0,
          username: '',
          role: '',
          error: action.payload,
        };

      case ACTIONS.LOGIN_SUCCESS:
        return {
          isAuthenticated: true,
          id: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          error: '',
        }

      case ACTIONS.LOGOUT:
        return {
          isAuthenticated: false,
          id: 0,
          username: '',
          role: '',
          error: '',
        }

      default:
        return state;
    }
  }

  const [userState, dispatch] = useReducer(reducer, initialState);

  // MAIN LOGIN
  const login = useCallback((id, username, role, error) => {
    if (!error) {
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: { id, username, role } })
      localStorage.setItem('AUTH', JSON.stringify({ isAuthenticated: true, id, username, role }));
    } else
      dispatch({ type: ACTIONS.LOGIN_ERROR, payload: error })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_ERROR })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('AUTH');
    dispatch({ type: ACTIONS.LOGOUT })
  }, []);

  // OAUTH REGISTER
  const oAuthLogin = useCallback((response) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfileOAuth = useCallback(async (profile) => {
    const { name, id } = profile;
    const validation = await saveUser(name, id);
    validation && login(validation.id, name, 'U', '');
    localStorage.setItem('AUTH', JSON.stringify({ isAuthenticated: true, id: validation.id, username: name, role: 'U' }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveUser = async (username, password) => {
    const user = { email: username, password }
    const response = await http().post(`${USERS_ENDPOINT}`, {
      body: user
    })
      .then(data => {
        if (!data.error) return data;
        else return false;
      });
    return response;
  }

  const data = useMemo(() => ({
    userState,
    login,
    logout,
    reset,
    oAuthLogin,
    setProfileOAuth

  }), [login, logout, reset, oAuthLogin, setProfileOAuth, userState])

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}