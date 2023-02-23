import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown';
import { Link as NavbarLink } from './Link';
import LanguageContext from '../../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigator = ({ containerClass, items, innerRef }) => {

  const { text } = useContext(LanguageContext);


  return (
    <nav className={containerClass} ref={innerRef}>
      <Dropdown items={items} dropdownTitle={text.header.bycicles} />
      <NavbarLink
        containerClass='container-link'
        text={text.header.contact}
      />
      {    console.log('renderizando navbar')}
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