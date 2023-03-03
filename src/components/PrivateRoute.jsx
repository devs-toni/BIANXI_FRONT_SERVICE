import React, { useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from './Loader';
const PrivateRoute = ({ component: Component, ...rest }) => {

  const { isToken } = rest;
  const [token, setToken] = useState(isToken);
  const { navigate } = useNavigate();

  
  return (
    <Route {...rest}>{token ? <Component /> : navigate("*")}</Route>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
}

export default PrivateRoute