import { useLanguage } from '../../context/GlobalContext';
import PropTypes from 'prop-types';
import Badge from './Badge';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../context/UserContext';
import { http } from '../../helpers/http';
import { productsUrl } from '../../config';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
  isEmpty,
  isSearch,
  type,
  id }) => {

  const { text } = useLanguage();
  const navigate = useNavigate();

  const { handleUser } = useUser();
  const { state: user_state } = handleUser();

  const emptyStyles = isEmpty ? 'empty' : '';
  const loadedStyles = loaded ? 'loaded' : '';
  const offerStyles = (offer && !isCart) ? 'erased' : '';

  const setNameCart = isCart && <p className={`${containerClass}__price-container--name`}>{name}</p>;
  const setName = !isCart && <p className={`${containerClass}__name`}>{name}</p>;
  const isOffer = offer > 0 ? true : false;
  const offerPrice = isOffer && <p className={`${containerClass}__price-container--price offer-price`}>{finalPrice} €</p>;
  const offerPreviousPrice = isOffer ? initPrice : finalPrice;

  const deleteLike = async () => {
    await http().del(`${productsUrl}/like/delete`, { body: [id, user_state.id] })
  }

  return (
    <div className={containerClass}>
      {
        isLike
        &&
        <FontAwesomeIcon icon={faXmark} onClick={deleteLike} className={`${containerClass}__like`} />
      }
      <img
        className={`${containerClass}__image ${emptyStyles} ${loadedStyles} ${(isRelated || isSearch || isLike) && 'point'}`}
        src={image}
        onLoad={() => setLoaded(true)}
        alt={name}
        onClick={() => (isRelated || isSearch || isLike) && navigate(`/product/options/${type}/${id}`)}
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
        (isEmpty && !isSearch && !isRelated)
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
  isRelated: PropTypes.bool,
  isLike: PropTypes.bool,
  isEmpty: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.number,
}
export default ProductBox;