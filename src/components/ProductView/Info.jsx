import React, { useContext, useState, useEffect, useRef } from 'react'
import LanguageContext from '../../context/LanguageContext';
import CartContext from '../../context/CartContext';
import { setProductPrice, isEmptyMethod } from '../../helpers/utils';
import { CartHandler } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { SizeSelector, ColorSelector } from '../index';


const Info = ({ product, total = 1 }) => {

  const { text } = useContext(LanguageContext);
  const { id, name, price, type, offer, sentence, description, datasheet, configuration, orders } = product;
  const [updatePrices, setUpdatePrices] = useState(null)
  const [isEmptyProduct, setIsEmptyProduct] = useState(false);

  const { addItemsToCart, countChange, findNumberProduct, totalProducts, getProduct } = useContext(CartContext);

  const inputNumberRef = useRef();

  useEffect(() => {
    setUpdatePrices(setProductPrice(offer, price));
    setIsEmptyProduct(isEmptyMethod(configuration));
  }, [product]);


  const handleCartAddition = () => {
    addItemsToCart(product, parseInt(inputNumberRef.current.value));
  };



  const emptyStyles = isEmptyProduct ? 'empty' : '';

  return (
    <>
      {
        updatePrices
          ?
          (
            <div className="info">
              <div className="info__main">
                <p className="info__main--name">{product.name}</p>
                <p className="info__main--short">{product.sentence}</p>
                <p className="info__main--price">{updatePrices.final} €</p>
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
                  innerRef={inputNumberRef}
                />
                <button className={`${emptyStyles} info__buy--add`} onClick={handleCartAddition}>{text.view.add}</button>
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="info__share">
                <p className="info__share--title">{text.view.share}</p>
                <div className="info__share--icons"></div>
              </div>
            </div>
          )
          :
          (
            <p>Loading</p>
          )
      }
    </>
  )
}

export default Info;