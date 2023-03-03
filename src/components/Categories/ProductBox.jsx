import React from 'react'
import { useLanguage } from '../../context/LanguageContext';
import PropTypes from 'prop-types';
import Badge from './Badge';

const ProductBox = ({ name, finalPrice, initPrice, image, loaded, setLoaded, containerClass, offer, isCart, isEmpty }) => {

  const { text } = useLanguage();


  const emptyStyles = isEmpty ? 'empty' : '';
  const loadedStyles = loaded ? 'loaded' : '';
  const offerStyles = (offer && !isCart) ? 'erased' : '';

  const setNameCart = isCart && <p className={`${containerClass}__price-container--name`}>{name}</p>;
  const setName = !isCart && <p className={`${containerClass}__name`}>{name}</p>;
  const isOffer = offer > 0 ? true : false;
  const offerPrice = isOffer && <p className={`${containerClass}__price-container--price offer-price`}>{finalPrice} €</p>;
  const offerPreviousPrice = isOffer ? initPrice : finalPrice;

  return (
    <div className={containerClass}>
      <img className={`${containerClass}__image ${emptyStyles} ${loadedStyles}`} src={image} onLoad={() => setLoaded(true)} alt={name} />
      {setName}
      <div className={`${containerClass}__price-container`}>
        {setNameCart}
        <p className={`${containerClass}__price-container--price ${offerStyles}`}>
          <span>{isCart && text.cart.price}</span>
          {initPrice ? offerPreviousPrice : finalPrice} €</p>
        {offerPrice}
      </div>
      {
        isEmpty
        &&
        <Badge
          containerClass="empty-product"
          text={text.product.empty}
        />
      }
    </div>
  )
}

ProductBox.propTypes = {
  name: PropTypes.string.isRequired,
  finalPrice: PropTypes.string.isRequired,
  initPrice: PropTypes.string,
  image: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  setLoaded: PropTypes.func.isRequired,
  containerClass: PropTypes.string.isRequired,
  offer: PropTypes.number,
  isCart: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool,
}
export default ProductBox;