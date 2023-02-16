import React from 'react';
import { useContext } from 'react';
import { Facebook, Github, Google, Twitter } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import LanguageContext from '../../context/LanguageContext';
import '../../assets/styles/css/index.min.css';


const Login = () => {

  const { text } = useContext(LanguageContext);

  return (
    <>
    </>
  )
}

export default Login;