import React, { useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { useUser } from '../../context/UserContext';
import { Connection } from '../../helpers/HTTP_Connection';
import { usersUrl } from '../../config';
import { useUI } from '../../context/UIContext';

const Form = ({ handler }) => {

  const { text } = useLanguage();

  const [formUser, setFormUser] = useState({
    email: '',
    password: ''
  });

  const { USER_ACTIONS, handleUser } = useUser();
  const { state: user_state, dispatch: user_dispatch } = handleUser();

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setFormUser({ ...formUser, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { post } = Connection();
    await post(`${usersUrl}/verify`, { body: formUser })
      .then(data => {
        if (!data) {
          user_dispatch({ type: USER_ACTIONS.LOGIN_ERROR, payload: { error: text.login.error } });
        } else {
          user_dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: { username: formUser.email, id: data } })
        }
      });
  }
  return (
    <>
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
          type="password"
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
      <p className='login__form--error'>{user_state?.error}</p>
    </>
  )
}

export default Form