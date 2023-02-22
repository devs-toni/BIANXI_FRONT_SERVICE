import React, { useContext } from 'react'
import CartContext from '../../context/CartContext';
import PropTypes from 'prop-types';

const ProductBox = ({ id, name, finalPrice, initPrice, image, loaded, setLoaded, containerClass, offer, stock }) => {

  const { findNumberProduct } = useContext(CartContext);

  return (
    <div className={containerClass}>
      <img className={`${containerClass}__image ${stock === 0 ? 'empty' : ''} ${findNumberProduct(id) > 0 ? 'selected' : ''} ${loaded ? 'loaded' : ''}`} src={image} onLoad={() => setLoaded(true)} alt={name} />
      <p className={`${containerClass}__name`}>{name}</p>
      <div className={`${containerClass}__price-container`}>
        <p className={`${containerClass}__price-container--price ${offer && 'erased'}`}>{offer > 0 ? initPrice : finalPrice} €</p>
        {offer > 0 && <p className={`${containerClass}__price-container--price offer-price`}>{finalPrice} €</p>}
      </div>
    </div>
  )
}

ProductBox.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  finalPrice: PropTypes.number.isRequired,
  initPrice: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  setLoaded: PropTypes.func.isRequired,
  containerClass: PropTypes.string.isRequired,
  offer: PropTypes.number,
  stock: PropTypes.number,
}
export default ProductBox;