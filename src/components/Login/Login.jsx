import React from 'react';
import { LoginContainer, CloseButton, Eye } from '../../assets/styles/styled/Login.styled';
import { useLanguage } from '../../context/LanguageContext';

export const Login = () => {

  const { text } = useLanguage();

  return (
    <LoginContainer>
      <h2>{text.login.signin}</h2>
    </LoginContainer>
  )
}

export default Login;