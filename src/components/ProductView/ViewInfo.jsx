import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState, useEffect, useRef } from 'react'
import CartContext from '../../context/CartContext';
import LanguageContext from '../../context/LanguageContext';
import { setProductPrice } from '../../helpers/utils';
import CartHandler from '../Categories/CartHandler'

const ViewInfo = ({ product, total = 1 }) => {

  const { text } = useContext(LanguageContext);
  const { addItemsToCart, countChange, findNumberProduct, totalProducts, getProduct } = useContext(CartContext);
  const [productStore, setProductStore] = useState({});
  const inputNumberRef = useRef();

  useEffect(() => {
    inputNumberRef.current.value = findNumberProduct(product.id);
    setProductStore(totalProducts[getProduct()]);
  }, [countChange]);

  useEffect(() => {
    const { price, offer } = product;
    const { init: initPrice, final: finalPrice } = setProductPrice(offer, price);
    setProductStore({ ...product, total, initPrice, finalPrice })
  }, [product])


  const handleCartAddition = () => {
    addItemsToCart(productStore, parseInt(inputNumberRef.current.value));
  };


  return (
    <div className="info">
      <div className="info__main">
        <p className="info__main--name">{productStore.name}</p>
        <p className="info__main--short">{productStore.sentence}</p>
        <p className="info__main--price">{productStore.finalPrice} €</p>
      </div>
      <div className="info__size">
        <p className="info__size--title">{text.view.size}</p>
        <select className="info__size--option" name="size" id="size">
          <option value="">{text.view.select}</option>
          {
            productStore.sizes?.sort((a, b) => a.id > b.id ? 1 : -1)
              .map(({ size }, index) => {
                return (<option key={index} value={size}>{size}</option>
                )
              })
          }
        </select>
      </div>
      <div className="info__color">
        <p className="info__color--title">{text.view.color}</p>
        {
          productStore.colors?.map(({ color }, index) => {
            const style = {
              color,
              backgroundColor: color
            }
            return (
              <div key={index} className="info__color--colors" style={style}></div>
            )
          })
        }
      </div>
      {
        product.stock === 0 &&
        <p className="info__empty">{text.view.empty}</p>
      }
      <div className="info__buy">
        <CartHandler
          product={productStore}
          containerClass='cart-buttons'
          isCart={false}
          innerRef={inputNumberRef}
        />
        <button className={`info__buy--add ${product.stock === 0 && 'empty'}`} onClick={handleCartAddition}>{text.view.add}</button>
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="info__share">
        <p className="info__share--title">{text.view.share}</p>
        <div className="info__share--icons">

        </div>
      </div>
    </div>
  )
}

export default ViewInfo;