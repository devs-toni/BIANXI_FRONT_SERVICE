import React, { useRef, useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { useCart } from '../../context/CartContext';
import { SizeSelector, ColorSelector } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import CartSelector from './CartSelector';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import PropTypes from 'prop-types';
import { useUI } from '../../context/UIContext';
import { UI_ACTIONS, UI_SECTIONS } from '../../configuration';

const Info = ({ setColorActivator, isLike, handleLike }) => {

  const { text } = useLanguage();

  const { productState } = useProduct();

  const { name, sentence } = productState.product;
  const configuration = productState.config;
  const size = productState.size;
  const prices = productState.updatedPrices;

  const { addProducts } = useCart();

  const { userState } = useAuth();

  const { handleUi } = useUI();

  const [totalSelected, setTotalSelected] = useState(0);
  const totalRef = useRef();

  const handleCartAddition = () => {
    const { current } = totalRef;
    addProducts({ ...productState.product, ...prices }, current.value)
    handleUi(UI_SECTIONS.CART, UI_ACTIONS.HANDLE);
  }

  const emptyStyles = (configuration?.stock === 0 || !configuration) ? 'empty' : '';
  const emptyStylesText = ((configuration?.stock === 0 || !configuration) && size) ? 'empty' : '';

  return (
    <div className="info">
      <div className="info__main">
        <p className="info__main--name">{name}</p>
        <p className="info__main--short">{sentence}</p>
        <p className="info__main--price">{prices.final} €</p>
      </div>
      <SizeSelector />
      <ColorSelector
        setActivator={setColorActivator}
      />
      <p className={`${emptyStylesText} info__empty`}>{text.view.empty}</p>
      <div className="info__buy">
        <CartSelector
          parentStyles='cart-buttons'
          innerRef={totalRef}
          value={totalSelected}
          setValue={setTotalSelected}
        />
        <button className={`${emptyStyles} info__buy--add`} onClick={handleCartAddition}>{text.view.add}</button>
        {
          userState.isAuthenticated
          &&
          <FontAwesomeIcon icon={faHeart} onClick={handleLike} className={isLike ? 'like' : ''} />
        }
      </div>
      <div className="info__share">
        <p className="info__share--title">{text.view.share}</p>
        <div className="info__share--icons"></div>
      </div>
    </div>
  )
}

Info.propTypes = {
  handleLike: PropTypes.func.isRequired,
  isLike: PropTypes.bool.isRequired,
  setColorActivator: PropTypes.func.isRequired
}
export default Info;
