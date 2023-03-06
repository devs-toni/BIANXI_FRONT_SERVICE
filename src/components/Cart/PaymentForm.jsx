import React, { useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { stripeUrl } from '../../config';
import { useToast } from '../../helpers/useToast';

const PaymentForm = ({ price }) => {
  const { text } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const { bigOkToast, bigErrorToast } = useToast();

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const paymentIntentDTO = {
        id: paymentMethod.id,
        amount: parseInt(price),
        currency: "EUR",
        description: text.payment.description
      }

      const { client_secret } = await fetch(`${stripeUrl}/payment_intent`, {
        body: JSON.stringify(paymentIntentDTO),
        method: "POST",
        headers: headers
      })
        .then(r => r.json())
        .then(r => { return r });

      await stripe.confirmPayment(`${client_secret}`, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'name',
          },
        },
      })
        .then(function (result) {

          if (result.error) {
            const message = result.error.message;
            setMessage(message);
            bigErrorToast(message);
          } else {
            const message = "Payment Successful";
            setMessage(message);
            bigOkToast(message);
          }
        });
    }
  }

  return (
    <div className="payment__form-container">
      <div className="payment__form-container--icon">
        <FontAwesomeIcon className='payment__form-container--icon' icon={faCheckDouble} />
      </div>
      <div className="container">
        <p className='container--title'>{text.payment.payTitle}</p>
        <form onSubmit={handleSubmit} className="container--form">
          <label className="label-card" htmlFor='numberCard'>{text.payment.name}</label>
          <input type="text" className="input-card" id="name-order" />
          <label className="label-card" htmlFor='numberCard'>{text.payment.lastname}</label>
          <input type="text" className="input-card" id="lastname-order" />
          <label className="label-card" htmlFor='numberCard'>{text.payment.address}</label>
          <input type="text" className="input-card" id="address-order" />
          <label className="label-card" htmlFor='numberCard'>{text.payment.cardTitle}</label>
          <CardElement className="input-card" />
          <input className='payment__pay' type="submit" value={text.payment.pay} />
        </form>
      </div>
    </div>
  )
}

PaymentForm.propTypes = {
  price: PropTypes.number.isRequired,
}
export default PaymentForm;