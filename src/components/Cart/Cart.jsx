import { faXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import CartContext from '../../context/CartContext';
import LanguageContext from '../../context/LanguageContext';
import { CartHandler, ProductBox, CartFooter } from '../index';

import { calcTotalPrice } from '../../helpers/utils';

const Cart = () => {

  const { totalProducts, isOpen, handleCart } = useContext(CartContext);
  const { text } = useContext(LanguageContext);

  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`cart ${isOpen ? 'active' : ''}`}>
      <div className={`cart-menu ${isOpen ? 'active' : ''}`} >
        <div className='cart-menu__header'>
          <FontAwesomeIcon icon={faXmark} onClick={handleCart} className='cart-menu__header--close' />
          <div className='cart-menu__header--content'>
            <FontAwesomeIcon className='cart-menu__header--content-icon' icon={faCartShopping} />
            <h1 className='cart-menu__header--content-title'>Cart</h1>
          </div>
        </div>
        <div className='cart-menu__content'>
          {
            totalProducts?.length > 0
              ?
              totalProducts.map(({ id, name, initPrice, finalPrice, type, offer, isEmpty, total }, i) => {
                return (
                  <div className='cart-menu__content--product' key={i}>
                    <div className="cart-menu__content--product-calc">
                      <ProductBox
                        name={name}
                        finalPrice={finalPrice}
                        initPrice={typeof(initPrice) === "string" ? initPrice : `${initPrice}`}
                        image={require(`../../assets/images/${type}/${name}.png`)}
                        loaded={imgLoaded}
                        setLoaded={setImgLoaded}
                        containerClass='cart-product-box'
                        offer={offer}
                        isCart={true}
                        isEmpty={isEmpty ? isEmpty : false}
                      />
                      <p className='total'>{calcTotalPrice(total, finalPrice)} €</p>
                    </div>
                    <CartHandler
                      product={{ id, name, initPrice, finalPrice, type, offer, total }}
                      containerClass='cart-buttons-section'
                      isCart={true}
                    />
                  </div>
                )
              })
              :
              <div className='cart-menu__empty'>
                <FontAwesomeIcon className="cart-menu__empty--svg" icon={faCartShopping} />
                <h1 className='cart-menu__empty--title'>{text.cart.empty}</h1>
              </div>
          }
        </div>
        <CartFooter />
      </div>
    </div>
  )
}

export default Cart