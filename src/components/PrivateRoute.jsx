import React, { useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const PrivateRoute = ({ component: Component, ...rest }) => {

  const [token, setToken] = useState('valid');
  
  const { navigate } = useNavigate();
  
  return (
    <Route {...rest}>{token ? <Component /> : navigate("/")}</Route>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
}

export default PrivateRoute