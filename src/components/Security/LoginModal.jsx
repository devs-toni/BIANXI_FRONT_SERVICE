import PropTypes from 'prop-types';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLanguage } from '../../context/GlobalContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';


const LoginModal = ({ closeHandler, isOpen }) => {

  const { text } = useLanguage();

  const isActiveStyles = isOpen ? 'active' : '';

  const { oAuthLogin } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => oAuthLogin(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <div className={`${isActiveStyles} login`}>
      <h2 className="login__title">{text.login.signin}</h2>
      <FontAwesomeIcon
        icon={faXmark}
        className="login__close"
        onClick={closeHandler}
      />
      <Form />
      <button className='login__google' onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  )
}

LoginModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}
export default LoginModal;