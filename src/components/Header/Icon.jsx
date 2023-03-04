import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ isMenu, isCart, containerClass, btnClass, icon, innerRef, handler }) => {

  const { vars } = useCart();
  const { totalProducts } = vars;

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const hasItems = (totalProducts.length > 0) ? true : false;
  const hasItemsStyles = hasItems ? 'active' : '';

  return (
    <button className={`${containerClass}-${btnClass} nav-icon`} onClick={handler}>
      {
        isMenu
          ?
          (
            ui_state.menuIsOpen
              ?
              <FontAwesomeIcon className={`${containerClass}-menu-close`} icon={faXmark} ref={innerRef} />
              :
              <FontAwesomeIcon icon={icon} ref={innerRef} />
          )
          :
          (
            <>
              <FontAwesomeIcon icon={icon} />
              {
                isCart
                &&
                <span className={hasItemsStyles}>{hasItems && totalProducts.length}</span>
              }
            </>
          )
      }
    </button>
  )
}

Icon.propTypes = {
  isMenu: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  containerClass: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,

  iconClose: PropTypes.object,
  innerRef: PropTypes.object
}

export default Icon