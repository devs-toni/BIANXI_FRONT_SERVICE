import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { ACTIONS } from '../config/types';
import { useQueryOAuthLogin, useQuerySaveUser } from '../persistence/users';


const authStorage = JSON.parse(localStorage.getItem('AUTH'));

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const oAuthRequest = useQueryOAuthLogin();
  const querySaveUser = useQuerySaveUser();

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
    oAuthRequest.mutateAsync({ access_token: response.access_token })
      .then(data => setProfileOAuth(data));
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
    const response = querySaveUser.mutateAsync({
      email: user.email,
      password: user.password
    }).then(data => {
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