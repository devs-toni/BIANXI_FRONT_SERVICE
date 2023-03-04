import React from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { Dropdown } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext';

const Navigator = ({ containerClass, items, innerRef, closeMenu }) => {

  const { text } = useLanguage();

  const { UI_ACTIONS, handleUi } = useUI();
  const { dispatch: ui_dispatch } = handleUi();

  return (
    <nav className={containerClass} ref={innerRef}>
      <Dropdown
        items={items}
        dropdownTitle={text.header.bycicles}
        closeMenu={closeMenu}
      />
      <FontAwesomeIcon
        className='navbar__nav--user'
        icon={faUser}
        onClick={() => {ui_dispatch({type: UI_ACTIONS.HANDLE_LOGIN})}}
      />
    </nav>
  )
}

Navigator.propTypes = {
  containerClass: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired,
  closeMenu: PropTypes.func.isRequired
}
export default Navigator