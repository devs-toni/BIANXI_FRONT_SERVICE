import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';


const MenuIcon = ({ parentStyles, handler, isOpen }) => {

  return (
    <button className={`${parentStyles}-hamburguer nav-icon`} onClick={handler}>
      {
        isOpen
          ?
          <FontAwesomeIcon className={`${parentStyles}-menu-close`} icon={faXmark} />
          :
          <FontAwesomeIcon icon={faBars} />
      }
    </button>
  )
}

MenuIcon.propTypes = {
  handler: PropTypes.func.isRequired,
  parentStyles: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default MenuIcon;