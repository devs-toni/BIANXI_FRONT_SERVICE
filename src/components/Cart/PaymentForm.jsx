import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { STRIPE_ENDPOINT } from '../../config/configuration';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ORDERS_LINK } from '../../router/paths';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';

const PaymentForm = ({ price }) => {
  const { text } = useLanguage();

  const stripe = useStripe();
  const elements = useElements();

  const { userState } = useAuth();

  const navigate = useNavigate();

  const { successPayment, cartState } = useCart();
  const { cartProducts } = cartState;

  const [loading, setLoading] = useState(false);

  const { handleToast } = useToast();

  const {
    form,
    validate,
    handleChange,
    errors } = useForm({
      name: "",
      lastname: "",
      address: "",
      email: ""
    });

  const handlePayment = async (e) => {
    e.preventDefault();
    validate();
    if (Object.keys(errors).map((key) => errors[key].length).filter(v => v !== 0).length === 0) {
      setLoading(true);
      const validPayment = await pay();

      if (validPayment) {
        setLoading(false);
        handleToast('👌', "Payment successful");

        setTimeout(function () {
          successPayment(form, price, cartProducts);
          if (userState.isAuthenticated)
            navigate(ORDERS_LINK)
          else
            navigate('/');
        }, 2000);

      }
    }
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

      const { client_secret } = await fetch(`${STRIPE_ENDPOINT}/payment_intent`, {
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
            handleToast('⛔', message);
            setLoading(false);
            return false;
          } else {
            return true;
          }
        });

      return isValid;
    } else {
      setLoading(false);
      handleToast('⛔', error.message);
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
          <p className='error'>{errors.name}</p>

          <label className="label-card" htmlFor='numberCard'>{text.payment.lastname}</label>
          <input type="text" className="input-card" name="lastname" value={form.lastname} onChange={handleChange} />

          <label className="label-card" htmlFor='numberCard'>{text.payment.address}</label>
          <input type="text" className="input-card" name="address" value={form.address} onChange={handleChange} />
          <p className='error'>{errors.address}</p>

          <label className="label-card" htmlFor='numberCard'>{text.payment.email}</label>
          <input type="email" className="input-card" name="email" value={form.email} onChange={handleChange} />
          <p className='error'>{errors.email}</p>

          <label className="label-card" htmlFor='numberCard'>{text.payment.cardTitle}</label>
          <CardElement className="input-card" />
          {
            loading
              ?
              <div className="lds-ripple payment__load-pay"><div></div><div></div></div>
              :
              <input className='payment__pay' type="submit" value={text.payment.pay} />
          }
        </form>
      </div>
      <Toaster />
    </div>
  )
}

PaymentForm.propTypes = {
  price: PropTypes.number.isRequired,
}
export default PaymentForm;
