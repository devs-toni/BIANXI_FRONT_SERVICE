import React, { useState } from 'react';
import { useLanguage } from '../../context/GlobalContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import { useUser } from '../../context/UserContext';
import LoggedMenu from './LoggedMenu';

export const Login = () => {

  const { text } = useLanguage();

  const { handleUser } = useUser();
  const { state: user_state } = handleUser();

  return (
    <>
      {
        user_state?.logged
          ?
          <LoggedMenu />
          :
          <LoginModal
            closeIcon={faXmark}
          />
      }
    </>
  )
}

export default Login;