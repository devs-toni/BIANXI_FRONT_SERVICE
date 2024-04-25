import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { STRIPE_SECRET_KEY } from '../../config/configuration';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ORDERS_LINK } from '../../router/paths';
import { Toaster } from 'react-hot-toast';
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
    const currentErrors = validate();
    if (Object.keys(currentErrors).map((key) => currentErrors[key].length).filter(v => v !== 0).length === 0) {
      setLoading(true);
      const validPayment = await pay();

      if (validPayment) {
        setLoading(false);
        handleToast('👌', "Payment successful");

        setTimeout(function () {
          successPayment(form, price, cartProducts);
          if (userState.isAuthenticated) {
            navigate(ORDERS_LINK)
            window.location.reload();
          }
          else
            navigate('/');
        }, 2000);

      }
    } else {
      handleToast('⛔', text.error.form);
    }
  }

  const pay = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const formData = new URLSearchParams();
      formData.append('payment_method_types[]', 'card');
      formData.append('amount', parseInt(price));
      formData.append('currency', 'eur');
      formData.append('description', text.payment.description);

      try {
        const response = await fetch('https://api.stripe.com/v1/payment_intents', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });

        const { client_secret, status } = await response.json();

        if (status === 'requires_action' || status === 'requires_payment_method') {
          const { error } = await stripe.confirmCardPayment(client_secret, {
            payment_method: paymentMethod.id
          });

          if (error) {
            handleToast('⛔', error.message);
            setLoading(false);
            return false;
          } else {
            return true;
          }
        } else if (status === 'succeeded') {
          return true;
        } else {
          handleToast('⛔', 'Error processing payment.');
          setLoading(false);
          return false;
        }
      } catch (error) {
        handleToast('⛔', 'Error processing payment.');
        setLoading(false);
        return false;
      }
    } else {
      setLoading(false);
      handleToast('⛔', error.message);
      return false;
    }
  };

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
          <input type="text" className="input-card" name="email" value={form.email} onChange={handleChange} />
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
