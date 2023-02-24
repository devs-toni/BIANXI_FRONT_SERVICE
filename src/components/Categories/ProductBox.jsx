import React, { useContext } from 'react'
import CartContext from '../../context/CartContext';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';

const ProductBox = ({ id, name, finalPrice, initPrice, image, loaded, setLoaded, containerClass, offer, stock, isCart }) => {

  const { findNumberProduct } = useContext(CartContext);
  const { text } = useContext(LanguageContext);

  return (
    <div className={containerClass}>
      <img className={`${containerClass}__image ${stock === 0 ? 'empty' : ''} ${findNumberProduct(id) > 0 ? 'selected' : ''} ${loaded ? 'loaded' : ''}`} src={image} onLoad={() => setLoaded(true)} alt={name} />
      {!isCart &&
        <p className={`${containerClass}__name`}>{name}</p>
      }
      <div className={`${containerClass}__price-container`}>
        {isCart &&
          <p className={`${containerClass}__price-container--name`}>{name}</p>
        }
        <p className={`${containerClass}__price-container--price ${offer && 'erased'}`}><span>{isCart && text.cart.price}</span>{offer > 0 ? initPrice : finalPrice} €</p>
        {offer > 0 && <p className={`${containerClass}__price-container--price offer-price`}>{finalPrice} €</p>}
      </div>
    </div>
  )
}

ProductBox.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  finalPrice: PropTypes.string.isRequired,
  initPrice: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  setLoaded: PropTypes.func.isRequired,
  containerClass: PropTypes.string.isRequired,
  offer: PropTypes.number,
  stock: PropTypes.number,
  isCart: PropTypes.bool.isRequired,
}
export default ProductBox;