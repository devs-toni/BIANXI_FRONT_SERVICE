import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/GlobalContext';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';
import PropTypes from 'prop-types';
import { CART_LINK } from '../../router/paths';

const CartFooter = ({ closeHandler }) => {

  const { text } = useLanguage();

  const { cartProducts, getTotalPriceCart, getIVAPriceCart } = useCart();

  return (
    <div className='cart-footer'>
      <div className='cart-footer__sub'>
        <p className="cart-footer__sub--title">{text.cart.subTotal}</p>
        <p className="cart-footer__sub--price">{formatNumberES(getTotalPriceCart(cartProducts), 2)} €</p>
      </div>
      <div className="cart-footer__total">
        <p className='cart-footer__total--title'>{text.cart.total}</p>
        <p className='cart-footer__total--price'>{formatNumberES(getTotalPriceCart(cartProducts), 2)} €</p>
        <p className='cart-footer__total--title'>({text.cart.include} {formatNumberES(getIVAPriceCart(cartProducts), 2)} € IVA)</p>
      </div>
      <div className='cart-footer__btns'>
        {
          cartProducts.length > 0
          ?
          <NavLink to={CART_LINK} className='cart-footer__btns--finish' onClick={closeHandler}>{text.cart.finishBtns}</NavLink>
          : 
          <button className='cart-footer__btns--finish' >{text.cart.finishBtns}</button>
        }
      </div>
    </div>
  )
}

CartFooter.propTypes = {
  closeHandler: PropTypes.func.isRequired
}
export default CartFooter;