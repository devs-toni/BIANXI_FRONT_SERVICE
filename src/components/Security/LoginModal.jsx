import PropTypes from 'prop-types';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLanguage } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { http } from '../../helpers/http';

const LoginModal = ({ closeHandler, isOpen }) => {

  const { text } = useLanguage();

  const isActiveStyles = isOpen ? 'active' : '';

  const { user_state, oAuthLogin, setProfileOAuth } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => oAuthLogin(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user_state.oAuth) {
        http()
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user_state.oAuth.access_token}`, {
            headers: {
              Authorization: `Bearer ${user_state.oAuth.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfileOAuth(res);
          })
          .catch((err) => console.log(err));
      }
    },
    [user_state.oAuth]
  );

  return (
    <div className={`${isActiveStyles} login`}>
      <h2 className="login__title">{text.login.signin}</h2>
      <FontAwesomeIcon
        icon={faXmark}
        className="login__close"
        onClick={closeHandler}
      />
      <Form />
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  )
}

LoginModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}
export default LoginModal;