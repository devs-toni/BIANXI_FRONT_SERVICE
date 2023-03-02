import React from 'react'
import { useLanguage } from '../../context/LanguageContext';
import { Dropdown } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

const Navigator = ({ containerClass, items, innerRef }) => {

  const { text } = useLanguage();


  return (
    <nav className={containerClass} ref={innerRef}>
      <Dropdown items={items} dropdownTitle={text.header.bycicles} />
      <FontAwesomeIcon className='navbar__nav--user' icon={faUser} />
    </nav>
  )
}

Navigator.propTypes = {
  containerClass: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired
}
export default Navigator