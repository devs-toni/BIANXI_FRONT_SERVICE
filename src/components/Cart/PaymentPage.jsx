import React, { useState } from 'react';
import { useLanguage } from '../../context/GlobalContext';
import PaymentForm from './PaymentForm';
import PaymentDetails from './PaymentDetails';
import { useCart } from '../../context/CartContext';
import { getTotalPriceCart } from '../../helpers/cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { stripeVisibleKey } from '../../config';

const PaymentPage = () => {

  const { handleCart } = useCart();
  const { state: cart_state } = handleCart();

  const { text } = useLanguage();

  const [stripePromise, setStripePromise] = useState(loadStripe(stripeVisibleKey));



  return (
    <div className='body-payment'>
      <div className='payment'>
        {
          stripePromise &&
          <>      <h2 className='payment__title'>{text.payment.title}</h2>
            <div className='payment__cupon'>
              <p className='payment__cupon--text'>{text.payment.cupon}</p>
              <a className='payment__cupon--ref' href="#" rel='noreferrer'>{text.payment.cuponLink}</a>
            </div>
            <PaymentDetails products={cart_state.cartProducts} />
            <Elements stripe={stripePromise}>
              <PaymentForm price={getTotalPriceCart(cart_state.cartProducts)} />
            </Elements>
          </>
        }
      </div>
    </div>
  )
}

export default PaymentPage;