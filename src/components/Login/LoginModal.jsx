import PropTypes from 'prop-types';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLanguage } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const LoginModal = ({ closeHandler, isOpen }) => {

  const { text } = useLanguage();

  const isActiveStyles = isOpen ? 'active' : '';

  return (
    <div className={`${isActiveStyles} login`}>
      <h2 className="login__title">{text.login.signin}</h2>
      <FontAwesomeIcon
        icon={faXmark}
        className="login__close"
        onClick={closeHandler}
      />
      <Form />
      <Link className='login__register'>{text.login.create}</Link>
    </div>
  )
}

LoginModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}
export default LoginModal;