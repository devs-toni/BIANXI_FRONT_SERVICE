import React, { createContext, useContext, useEffect, useState } from 'react'


const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

  const [token, setToken] = useState('');
  const [loginStatus, setLoginStatus] = useState(false)


  // VISUAL

  const [isActive, setIsActive] = useState(false);

  const handleLogin = (e) => {
    setIsActive(!isActive);
  }

  const handleClose = (e) => {
    isActive && setIsActive(false);
  }

  const data = {
    vars: {
      loginStatus,
      setLoginStatus
    },
    modal: {
      isActive,
      setIsActive,
      handleLogin,
      handleClose
    }

  }

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  )
}