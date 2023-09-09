import React from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { Dropdown } from '../index';
import PropTypes from 'prop-types'

const langs = [
  {
    text: "ES"
  },
  {
    text: "EN"
  },
  {
    text: "IT"
  }
];

const Navigator = ({ parentStyles, items, handler }) => {

  const { text } = useLanguage();
  const { language, handleLanguage } = useLanguage();

  return (
    <nav className={parentStyles}>
      <Dropdown
        items={langs}
        dropdownTitle={language.toUpperCase()}
        handler={handleLanguage}
        style={{ minWidth: "100px" }}
      />
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
