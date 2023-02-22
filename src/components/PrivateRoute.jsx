import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
const PrivateRoute = ({ component: Component, ...rest }) => {

  const [token, setToken] = useState('valid');

  return (
    <Route {...rest}>{token ? <Component /> : <Redirect to='/' />}</Route>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
}

export default PrivateRoute