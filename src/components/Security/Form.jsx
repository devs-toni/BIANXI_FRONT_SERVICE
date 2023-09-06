import React, { useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { useAuth } from '../../context/AuthContext';
import { http } from '../../helpers/http';
import { USERS_ENDPOINT } from '../../config/configuration';

const Form = () => {

  const { text } = useLanguage();

  const [formUser, setFormUser] = useState({
    email: '',
    password: ''
  });

  const { userState, reset, login } = useAuth();


  const handleInput = ({ target }) => {
    const { name, value } = target;
    setFormUser({ ...formUser, [name]: value })
    reset();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await http().post(`${USERS_ENDPOINT}/verify`, { body: formUser })
      .then(data => {
        if (data.length === 0) {
          login(null, null, null , "Email/Contraseña incorrectos!");
        } else {
          login(data.id, data.email, data.role)
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
      <p className='login__form--error'>{userState?.error}</p>
    </>
  )
}

export default Form;