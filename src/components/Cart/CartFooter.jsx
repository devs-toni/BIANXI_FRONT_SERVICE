import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/GlobalContext';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';

const CartFooter = () => {

  const { text } = useLanguage();
  const { extra } = useCart();
  const { getTotalPriceCart, getIVAPriceCart } = extra;

  return (
    <div className='cart-footer'>
      <div className='cart-footer__sub'>
        <p className="cart-footer__sub--title">{text.cart.subTotal}</p>
        <p className="cart-footer__sub--price">{formatNumberES(getTotalPriceCart(), 2)} €</p>
      </div>
      <div className="cart-footer__total">
        <p className='cart-footer__total--title'>{text.cart.total}</p>
        <p className='cart-footer__total--price'>{formatNumberES(getTotalPriceCart(), 2)} €</p>
        <p className='cart-footer__total--title'>({text.cart.include} {formatNumberES(getIVAPriceCart(), 2)} € IVA)</p>
      </div>
      <div className='cart-footer__btns'>
        <NavLink to='/shopping-cart' className='cart-footer__btns--finish'>{text.cart.finishBtns}</NavLink>
      </div>
    </div>
  )
}



export default CartFooter;