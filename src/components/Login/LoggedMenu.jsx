import React from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
      <p className='login__name'>{text.login.hi} {username}!</p>
      <p className='login__link' onClick={handlerFavourites}>{text.login.likes}</p>
      <p className='login__link' onClick={logoutHandler}>{text.login.logout}</p>
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