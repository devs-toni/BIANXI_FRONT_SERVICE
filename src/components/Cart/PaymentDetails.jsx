import React from 'react'
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/GlobalContext';
import uuid from 'react-uuid';
import { formatNumberES, setProductPrice } from '../../helpers/utils';
import { useCart } from '../../context/CartContext';
import { NEW_USER_DISCOUNT } from '../../config/configuration';

const PaymentDetails = ({ products }) => {

  const { text } = useLanguage();

  const { cartState, getTotalPriceCart } = useCart();
  const { totalAmount: total, iva, activeCupon, discountCupon, discountNew, isNew } = cartState;

  return (
    <div className='payment__details'>
      <table className='payment__details--table'>
        <thead className='head'>
          <tr className='head__row'>
            <th className='head__row--left'>{text.payment.product}</th>
            <th className='head__row--right'>{text.payment.sub}</th>
          </tr>
        </thead>
        <tbody className='body'>
          {
            products.map(p => {
              return (
                <tr key={uuid()} className='body__row'>
                  <td className='body__row--product'>
                    <p className='name'>{p.name}</p>
                    {
                      p.config.map(cnf => {
                        const styleColor = {
                          backgroundColor: cnf.color.color
                        }
                        return (
                          <React.Fragment key={uuid()}>
                            <p className='total'>x {cnf.total}</p>
                            <div className="size">
                              <p className='size__title'>{text.payment.sizeTitle}</p>
                              <p className='size__result'>{cnf.sizes.size}</p>
                            </div>
                            <div className="color">
                              <p className='color__title'>{text.payment.colorTitle}</p>
                              <div className='color__result' style={styleColor}>{ }</div>
                            </div>
                          </React.Fragment>
                        )
                      })
                    }
                  </td>
                  <td className='body__row--price'>
                    <p className="ind">{formatNumberES(p.price, 2)} € / u</p>
                    <p className="total">{setProductPrice(p?.offer, (p.price * p.total)).final} €</p>
                  </td>
                </tr>
              )
            })
          }

          {
            activeCupon &&
            <tr className='body__row'>
              <td className='body__row--sub-discount'>{Math.ceil((discountCupon / getTotalPriceCart(cartState.cartProducts)) * 100)}% {text.payment.discount.toLowerCase()}</td>
              <td className='body__row--subtotal-discount'>- {formatNumberES(discountCupon, 2)} €</td>
            </tr>
          }
          {
            isNew &&
            <tr className='body__row'>
              <td className='body__row--sub-discount'>{NEW_USER_DISCOUNT}% {text.payment.new.toLowerCase()}</td>
              <td className='body__row--subtotal-discount'>- {formatNumberES(discountNew, 2)} €</td>
            </tr>
          }

          <tr className='body__row'>
            <td className='body__row--sub'>{text.payment.sub}</td>
            <td className='body__row--subtotal'>{formatNumberES(total, 2)} €</td>
          </tr>
        </tbody>
        <tfoot className='foot'>
          <tr className='foot__row'>
            <td className='foot__row--left'>{text.payment.total}</td>
            <td className='foot__row--right'>
              <p className='total'>{formatNumberES(total, 2)} €</p>
              <p className='iva'><span>({text.payment.include}</span> {formatNumberES(iva)} €</p>
              <p className='iva-title'>IVA)</p>
              <p></p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

PaymentDetails.propTypes = {
  products: PropTypes.array.isRequired,
}
export default PaymentDetails;