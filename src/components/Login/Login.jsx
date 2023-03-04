import React, { useState } from 'react';
import { useLanguage } from '../../context/GlobalContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { Connection } from '../../helpers/HTTP_Connection';
import { usersUrl } from '../../config';
import { useUI } from '../../context/UIContext';

export const Login = () => {

  const { text } = useLanguage();

  const navigate = useNavigate();

  const [formUser, setFormUser] = useState({
    email: '',
    password: ''
  });

  const { UI_ACTIONS, handleUi } = useUI();
  const {state: ui_state, dispatch: ui_dispatch} = handleUi();

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

  const isActiveStyles = ui_state.loginIsOpen ? 'active' : '';

  return (

    <div className={`${isActiveStyles} login`}>
      <h2 className="login__title">{text.login.signin}</h2>
      <FontAwesomeIcon
        icon={faXmark}
        className="login__close"
        onClick={() => {ui_dispatch({type: UI_ACTIONS.CLOSE_LOGIN})}}
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