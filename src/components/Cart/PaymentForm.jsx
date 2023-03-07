import { useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { stripeUrl } from '../../config';
import { useForm } from '../../helpers/useForm';
import { useToast } from '../../helpers/useToast';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ price }) => {
  const { text } = useLanguage();

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const { handleCart } = useCart();
  const { state: cart_state, dispatch: cart_dispatch, CART_ACTIONS } = handleCart();

  const [formErrors, setFormErrors] = useState({});

  const {
    form,
    validate,
    handleChange } = useForm({
      name: "",
      lastname: "",
      address: "",
      email: ""
    });

  const { bigOkToast, bigErrorToast } = useToast();


  const handlePayment = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const validPayment = await pay();
      console.log(validPayment);
      validPayment && cart_dispatch({ type: CART_ACTIONS.PAYMENT_SUCCESS, payload: {price, form} });
      navigate("/");
    } else setFormErrors(errors)
  }

  const pay = async () => {
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

      const isValid = await stripe.confirmCardPayment(`${client_secret}`, {
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
            bigErrorToast(message);
            return false;

          } else {
            bigOkToast("Payment Successful");
            return true;
          }
        });

      return isValid;
    }
  }

  return (
    <div className="payment__form-container">
      <div className="payment__form-container--icon">
        <FontAwesomeIcon className='payment__form-container--icon' icon={faCheckDouble} />
      </div>
      <div className="container">
        <p className='container--title'>{text.payment.payTitle}</p>
        <form onSubmit={handlePayment} className="container--form">
          <label className="label-card" htmlFor='numberCard'>{text.payment.name}</label>
          <input type="text" className="input-card" name='name' value={form.name} onChange={handleChange} />
          <p className='error'>{formErrors.name}</p>

          <label className="label-card" htmlFor='numberCard'>{text.payment.lastname}</label>
          <input type="text" className="input-card" name="lastname" value={form.lastname} onChange={handleChange} />

          <label className="label-card" htmlFor='numberCard'>{text.payment.address}</label>
          <input type="text" className="input-card" name="address" value={form.address} onChange={handleChange} />
          <p className='error'>{formErrors.address}</p>

          <label className="label-card" htmlFor='numberCard'>{text.payment.email}</label>
          <input type="email" className="input-card" name="email" value={form.email} onChange={handleChange} />
          <p className='error'>{formErrors.email}</p>

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
