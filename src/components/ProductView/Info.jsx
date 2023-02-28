import React, { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { SizeSelector, ColorSelector, CartHandler } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';


const Info = ({ total = 1 }) => {

  const { text } = useContext(LanguageContext);
  const { vars: productVars } = useProduct();
  const { isEmptyProduct, current: product, updatedPrices } = productVars;
  const { id, name, price, type, offer, sentence, description, datasheet, configuration, orders } = product;

  const { vars: cartVars, funcs, extra } = useCart();
  const { totalProducts } = cartVars;
  const { handleAddSpecificNumberProduct } = funcs;
  const { findNumberProduct, getProduct } = extra;

  const handleCartAddition = () => {
    handleAddSpecificNumberProduct(product);
  }

  const emptyStyles = isEmptyProduct ? 'empty' : '';

  return (
    <>
      {
        updatedPrices &&
        <div className="info">
          <div className="info__main">
            <p className="info__main--name">{name}</p>
            <p className="info__main--short">{sentence}</p>
            <p className="info__main--price">{updatedPrices.final} €</p>
          </div>
          <SizeSelector />
          <ColorSelector />
          {
            isEmptyProduct
            &&
            <p className="info__empty">{text.view.empty}</p>
          }
          <div className="info__buy">
            <CartHandler
              product={product}
              containerClass='cart-buttons'
              isCart={false}
            />
            <button className={`${emptyStyles} info__buy--add`} onClick={handleCartAddition}>{text.view.add}</button>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="info__share">
            <p className="info__share--title">{text.view.share}</p>
            <div className="info__share--icons"></div>
          </div>
        </div>
      }

    </>
  )
}

export default Info;