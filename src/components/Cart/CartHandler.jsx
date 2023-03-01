import React, { useContext, useState, useEffect, memo } from 'react'
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';

const CartHandler = memo(({ product, containerClass }) => {

  const { text } = useContext(LanguageContext);

  const { vars: cartVars, funcs, extra } = useCart();
  const { totalProducts } = cartVars;
  const { handleAddProduct, handleRemoveProduct } = funcs;
  const { findNumberProduct, deleteAllProductRepeats } = extra;
  const numProducts = findNumberProduct(product.id);
  const [currentNumber, setCurrentNumber] = useState(numProducts);

  const handleCart = (product, operation) => {
    if (operation === '+') {
      handleAddProduct(product);
    } else {
      handleRemoveProduct(product);
    }
  }

  useEffect(() => {
    const total = findNumberProduct(product.id);
    setCurrentNumber(total ? total : 0);
  }, [totalProducts])


  return (
    <div className={containerClass}>
      <div className={`${containerClass}__cart`}>
        <FontAwesomeIcon
          className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`}
          onClick={() => handleCart(product, '-')}
          icon={faMinus}
        />
        <p className={`${containerClass}__cart--number ${product.stock === 0 && 'empty'}`}>{currentNumber}</p>
        <FontAwesomeIcon
          className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`}
          onClick={() => handleCart(product, '+')}
          icon={faPlus}
        />
      </div>
      <div className={`${containerClass}__cart--remove`} onClick={() => deleteAllProductRepeats(product.id)}>
        <FontAwesomeIcon
          icon={faTrash}
          className={`${containerClass}__cart--remove-trash`}
        />
        <p className={`${containerClass}__cart--remove-text`}>{text.cart.delete}</p>
      </div>
    </div>
  )
})

CartHandler.propTypes = {
  product: PropTypes.object.isRequired,
  containerClass: PropTypes.string.isRequired,
}
export default CartHandler;