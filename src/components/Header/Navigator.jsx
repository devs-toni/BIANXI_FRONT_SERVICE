import React from 'react'
import { useLanguage } from '../../context/LanguageContext';
import { Dropdown } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import { useUser } from '../../context/UserContext';

const Navigator = ({ containerClass, items, innerRef }) => {

  const { text } = useLanguage();
  const { modal } = useUser();
  const { handleLogin } = modal;

  return (
    <nav className={containerClass} ref={innerRef}>
      <Dropdown
        items={items}
        dropdownTitle={text.header.bycicles}
      />
      <FontAwesomeIcon
        className='navbar__nav--user'
        icon={faUser}
        onClick={handleLogin}
      />
    </nav>
  )
}

Navigator.propTypes = {
  containerClass: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired
}
export default Navigator