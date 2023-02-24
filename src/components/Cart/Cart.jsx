import { faXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import CartContext from '../../context/CartContext';
import LanguageContext from '../../context/LanguageContext';
import CartHandler from '../Categories/CartHandler';
import ProductBox from '../Categories/ProductBox';
import { calcTotalPrice } from '../../helpers/utils';
import CartFooter from './CartFooter';

const Cart = () => {

  const { totalProducts, isOpen, handleCart } = useContext(CartContext);
  const { text } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(false);

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
              totalProducts.map(({ id, name, init, final, type, offer, stock, total }, index) => {

                return (
                  <div className='cart-menu__content--product' key={index}>
                    <div className="cart-menu__content--product-calc">
                      <ProductBox
                        key={index}
                        id={id}
                        name={name}
                        finalPrice={final}
                        initPrice={`${init}`}
                        image={require(`../../assets/images/${type}/${name}.png`)}
                        loaded={loaded}
                        setLoaded={setLoaded}
                        containerClass='cart-product-box'
                        offer={offer}
                        stock={stock}
                        isCart={true}
                      />
                      <p className='total'>{calcTotalPrice(total, final)} €</p>
                    </div>
                    <CartHandler
                      product={{ id, name, init, final, type, offer, stock, total }}
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