import React, { useState } from 'react';
import { useLanguage } from '../../context/GlobalContext';
import PaymentForm from './PaymentForm';
import PaymentDetails from './PaymentDetails';
import { useCart } from '../../context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_VISIBLE_KEY } from '../../configuration';
import { Navigate } from 'react-router-dom';

const PaymentPage = () => {

  const { cartProducts, getTotalPriceCart } = useCart();

  const { text } = useLanguage();

  const [stripePromise, setStripePromise] = useState(loadStripe(STRIPE_VISIBLE_KEY));

  if (cartProducts.length === 0) return <Navigate to="/" />

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
            <PaymentDetails products={cartProducts} />
            <Elements stripe={stripePromise}>
              <PaymentForm price={getTotalPriceCart(cartProducts)} />
            </Elements>
          </>
        }
      </div>
    </div>
  )
}

export default PaymentPage;