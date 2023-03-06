import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/GlobalContext';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';
import { getIVAPriceCart, getTotalPriceCart } from '../../helpers/cart';
import PropTypes from 'prop-types';

const CartFooter = ({ closeHandler }) => {

  const { text } = useLanguage();

  const { handleCart } = useCart();
  const { state: cart_state } = handleCart();

  return (
    <div className='cart-footer'>
      <div className='cart-footer__sub'>
        <p className="cart-footer__sub--title">{text.cart.subTotal}</p>
        <p className="cart-footer__sub--price">{formatNumberES(getTotalPriceCart(cart_state.cartProducts), 2)} €</p>
      </div>
      <div className="cart-footer__total">
        <p className='cart-footer__total--title'>{text.cart.total}</p>
        <p className='cart-footer__total--price'>{formatNumberES(getTotalPriceCart(cart_state.cartProducts), 2)} €</p>
        <p className='cart-footer__total--title'>({text.cart.include} {formatNumberES(getIVAPriceCart(cart_state.cartProducts), 2)} € IVA)</p>
      </div>
      <div className='cart-footer__btns'>
        <NavLink to='/shopping-cart' className='cart-footer__btns--finish' onClick={closeHandler}>{text.cart.finishBtns}</NavLink>
      </div>
    </div>
  )
}

CartFooter.propTypes = {
  closeHandler: PropTypes.func.isRequired
}
export default CartFooter;