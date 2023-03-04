import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

const Icon = ({ containerClass, icon, isCart, iconClose, isNavShow, handleMenu, innerRef }) => {

  const { vars } = useCart();
  const { totalProducts } = vars;

  const { UI_ACTIONS, handleUi } = useUI();
  const { dispatch: ui_dispatch } = handleUi();
  
  const hasItems = (totalProducts.length > 0) ? true : false;
  const hasItemsStyles = hasItems ? 'active' : '';

  return (
    <div className={containerClass}>
      {
        isCart
          ?
          (
            <button className={`${containerClass}--cart`} onClick={() => {ui_dispatch({type: UI_ACTIONS.HANDLE_CART})}} >
              <FontAwesomeIcon icon={icon} />
              <span className={hasItemsStyles}>{hasItems && totalProducts.length}</span>
            </button>
          )
          :
          (
            (
              isNavShow
                ?
                <FontAwesomeIcon className={`${containerClass}--menu-close`} icon={iconClose} onClick={handleMenu} ref={innerRef} />
                :
                <FontAwesomeIcon className={`${containerClass}--hamburguer`} icon={icon} onClick={handleMenu} ref={innerRef} />
            )
          )
      }
    </div>
  )
}

Icon.propTypes = {
  containerClass: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  iconClose: PropTypes.object,
  isCart: PropTypes.bool.isRequired,
  handleMenu: PropTypes.func,
  innerRef: PropTypes.object
}

export default Icon