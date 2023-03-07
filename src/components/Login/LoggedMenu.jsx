import PropTypes from 'prop-types';
import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock, faStar } from '@fortawesome/free-regular-svg-icons';

const LoggedMenu = ({ username, logoutHandler, closeHandler, isOpen, handlerFavourites }) => {

  const { text } = useLanguage();

  const isActiveStyles = isOpen ? 'active' : '';

  return (
    <div className={`${isActiveStyles} login`}>
      <FontAwesomeIcon
        icon={faXmark}
        className="login__close"
        onClick={closeHandler}
      />
      <p className='login__name'>{text.login.hi} {username}!
      </p>
      <p className='login__link' onClick={handlerFavourites}>
        <FontAwesomeIcon icon={faStar} />
        {text.login.likes}
      </p>
      <p className='login__link' onClick={logoutHandler}>
        <FontAwesomeIcon icon={faClock} />
        {text.login.orders}
      </p>
      <p className='login__link--out' onClick={logoutHandler}>
        <FontAwesomeIcon icon={faDoorOpen} />
        {text.login.logout}
      </p>
    </div>
  )
}

LoggedMenu.propTypes = {
  username: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
  logoutHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handlerFavourites: PropTypes.func.isRequired,
}
export default LoggedMenu;