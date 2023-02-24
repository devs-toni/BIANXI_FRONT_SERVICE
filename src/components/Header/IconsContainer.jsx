import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartContext from '../../context/CartContext';

const IconsContainer = ({ containerClass, icon, isCart, iconClose, isNavShow, handleMenu, innerRef }) => {

  const { handleCart, totalProducts } = useContext(CartContext);

  return (
    <div className={containerClass}>
      {
        isCart
          ?
          (
            <button className={`${containerClass}--cart ${isNavShow ? 'hide' : ''}`} onClick={handleCart} >
              <FontAwesomeIcon icon={icon} />
              <span className={`${totalProducts.length > 0 && 'active'}`}>{totalProducts.length > 0 && totalProducts.length}</span>
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

IconsContainer.propTypes = {
  containerClass: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  iconClose: PropTypes.object,
  isCart: PropTypes.bool.isRequired,
  isNavShow: PropTypes.bool,
  handleMenu: PropTypes.func,
  innerRef: PropTypes.object
}

export default IconsContainer