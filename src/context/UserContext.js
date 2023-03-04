import React, { createContext, useContext, useEffect, useState } from 'react'


const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

  const [token, setToken] = useState('');
  const [loginStatus, setLoginStatus] = useState(false)

  const data = {
    vars: {
      loginStatus,
      setLoginStatus
    }

  }

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  )
}