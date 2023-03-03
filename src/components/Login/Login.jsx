import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Connection } from '../../helpers/HTTP_Connection';
import { usersUrl } from '../../config';
import axios from 'axios';

export const Login = () => {

  const { text } = useLanguage();
  const { modal } = useUser();
  const navigate = useNavigate();

  const { isActive, handleClose } = modal;

  const [formUser, setFormUser] = useState({
    email: '',
    password: ''
  });

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setFormUser({ ...formUser, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { post } = Connection();
    await post(`${usersUrl}/verify`, { body: formUser })
      .then(data => {

      });

    navigate("/login");
  }

  const isActiveStyles = isActive ? 'active' : '';

  return (
    <div className={`${isActiveStyles} login`}>
      <h2 className="login__title">{text.login.signin}</h2>
      <FontAwesomeIcon
        icon={faXmark}
        className="login__close"
        onClick={handleClose}
      />
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="text"
          className='login__form--username'
          name="email"
          placeholder={text.login.email}
          onChange={handleInput}
          value={formUser.email}
        />
        <input
          type="text"
          className='login__form--password'
          name="password"
          placeholder={text.login.password}
          onChange={handleInput}
          value={formUser.password}
        />
        <input
          type="submit"
          className='login__form--send'
          value={text.login.signin} />
      </form>
      <Link className='login__register'>{text.login.create}</Link>
    </div>
  )
}

export default Login;