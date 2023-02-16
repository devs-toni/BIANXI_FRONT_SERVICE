import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const [token, setToken] = useState('valid');

  return (
    <Route {...rest}>{token ? <Component /> : <Redirect to='/' />}</Route>
  )
}

export default PrivateRoute