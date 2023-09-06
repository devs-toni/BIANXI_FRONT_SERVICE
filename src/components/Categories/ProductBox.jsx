import { useLanguage } from '../../context/GlobalContext';
import PropTypes from 'prop-types';
import Badge from './Badge';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../context/AuthContext';
import { http } from '../../helpers/http';
import { PRODUCTS_ENDPOINT, PRODUCT_PROPERTIES } from '../../config/configuration';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { PRODUCT_LINK } from '../../router/paths';
import { useProduct } from '../../context/ProductContext';

const ProductBox = ({
  name,
  finalPrice,
  initPrice,
  image,
  loaded,
  setLoaded,
  containerClass,
  offer,
  isCart,
  isRelated,
  isLike,
  isAll,
  isEmpty,
  isSearch,
  type,
  id,
  getFavourites }) => {

  const { text } = useLanguage();
  const navigate = useNavigate();

  const { userState } = useAuth();
  const { setProperty } = useProduct();

  const emptyStyles = isEmpty ? 'empty' : '';
  const loadedStyles = loaded ? 'loaded' : '';
  const offerStyles = (offer && !isCart) ? 'erased' : '';

  const setNameCart = isCart && <p className={`${containerClass}__price-container--name`}>{name}</p>;
  const setName = !isCart && <p className={`${containerClass}__name`}>{name}</p>;
  const isOffer = offer > 0 ? true : false;
  const offerPrice = isOffer && <p className={`${containerClass}__price-container--price offer-price`}>{finalPrice} €</p>;
  const offerPreviousPrice = isOffer ? initPrice : finalPrice;

  const deleteLike = async () => {
    await http()
      .del(`${PRODUCTS_ENDPOINT}/likes/${id}/${userState.id}`).then((data) => {
        if (!data.error) getFavourites()
      })
  }

  return (
    <div className={containerClass}>
      <img
        className={`${containerClass}__image ${emptyStyles} ${loadedStyles} ${(isRelated || isSearch || isLike) && 'point'}`}
        src={image}
        onLoad={() => setLoaded(true)}
        alt={name}
        onClick={() => (isRelated || isSearch || isLike) && navigate(`${PRODUCT_LINK}/${type.toString()}/${id.toString()}`)}
      />
      {setName}
      <div className={`${containerClass}__price-container`}>
        {setNameCart}

        {
          (!isSearch)
            ?
            <>
              <p className={`${containerClass}__price-container--price ${offerStyles}`}>
                <span>{isCart && text.cart.price}</span>
                {initPrice ? offerPreviousPrice : finalPrice} €</p>
              {offerPrice}
            </>
            :
            <>
              <p className={`${containerClass}__price-container--price`}>{finalPrice} €</p>
            </>
        }
      </div>
      {
        (isEmpty && !isSearch && !isRelated && !isLike)
        &&
        <Badge
          containerClass="empty-product"
          text={text.product.empty}
        />
      }
      {
        isLike
        &&
        <FontAwesomeIcon icon={faLinkSlash} onClick={deleteLike} className={`${containerClass}__delete`} />
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
  isRelated: PropTypes.bool,
  isLike: PropTypes.bool,
  isAll: PropTypes.bool,
  isEmpty: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.number,
}
export default ProductBox;