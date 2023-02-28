import React, { useContext } from 'react'
import CartContext from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'

const Icon = ({ containerClass, icon, isCart, iconClose, isNavShow, handleMenu, innerRef }) => {

  const { handleCart, totalProducts } = useContext(CartContext);

  const hasItems = (totalProducts.length > 0) ? true : false;
  const hasItemsStyles = hasItems ? 'active' : '';

  return (
    <div className={containerClass}>
      {
        isCart
          ?
          (
            <button className={`${containerClass}--cart`} onClick={handleCart} >
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
  isNavShow: PropTypes.bool,
  handleMenu: PropTypes.func,
  innerRef: PropTypes.object
}

export default Icon