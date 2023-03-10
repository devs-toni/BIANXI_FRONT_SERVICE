import React from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { Dropdown } from '../index';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Navigator = ({ parentStyles, items, handler }) => {

  const { text } = useLanguage();

  return (
    <nav className={parentStyles}>
      <div className='container-link'>
        <Link className='item-link' to="/">{text.header.promo}</Link>
      </div>
      <Dropdown
        items={items}
        dropdownTitle={text.header.bycicles}
        handler={handler}
      />
    </nav>
  )
}

Navigator.propTypes = {
  parentStyles: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired
}
export default Navigator