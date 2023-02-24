import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { setProductPrice } from '../../helpers/utils';
import CartHandler from '../Categories/CartHandler'

const ViewInfo = ({ product, type, total = 1 }) => {

  const { text } = useContext(LanguageContext);
  const { id, name, price, offer, stock, sizes, colors } = product;
  const { init, final } = setProductPrice(offer, price);
  const [productStore, setProductStore] = useState({ ...{ id, name, offer, stock, sizes, colors }, total, type, init, final })

  return (
    <div className="info">
      <div className="info__main">
        <p className="info__main--name">{name}</p>
        <p className="info__main--short">EVERY STRADA IS POSSIBLE</p>
        <p className="info__main--price">{setProductPrice(offer, price).final} €</p>
      </div>
      <div className="info__size">
        <p className="info__size--title">{text.view.size}</p>
        <select className="info__size--option" name="size" id="size">
          <option value="">{text.view.select}</option>
          {
            sizes?.map((size, index) => {
              return (<option key={index} value={size}>{size}</option>
              )
            })
          }
        </select>
      </div>
      <div className="info__color">
        <p className="info__color--title">{text.view.color}</p>
        {
          colors?.map((color, index) => {
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
      <p className="info__empty">Agotado</p>
      <div className="info__buy">
        <CartHandler
          product={productStore}
          containerClass='cart-buttons'
          isCart={false}
        />
        <button className="info__buy--add">{text.view.add}</button>
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

export default ViewInfo