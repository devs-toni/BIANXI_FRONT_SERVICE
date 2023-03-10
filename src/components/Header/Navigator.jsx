import React from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { Dropdown } from '../index';
import PropTypes from 'prop-types'
import es from '../../assets/images/lang/es.png';
import en from '../../assets/images/lang/en.png';
import it from '../../assets/images/lang/it.png';

const Navigator = ({ parentStyles, items, handler }) => {

  const { text } = useLanguage();
  const { language, handleLanguage } = useLanguage();

  const languageStyle = (lang) => language === lang ? "active" : '';

  return (
    <nav className={parentStyles}>
      <div className="languages">
        <div className={`navbar__options--lang ${languageStyle('es') ? "active" : ''}`}>
          <img src={es} alt="es" name="es" onClick={handleLanguage} />
        </div>
        <div className={`navbar__options--lang ${languageStyle('en') ? "active" : ''}`}>
          <img src={en} alt="en" className='w' name="en" onClick={handleLanguage} />
        </div>
        <div className={`navbar__options--lang ${languageStyle('it') ? "active" : ''}`}>
          <img src={it} alt="it" className="w" name="it" onClick={handleLanguage} />
        </div>
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