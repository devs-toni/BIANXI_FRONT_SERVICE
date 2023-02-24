import React, { useContext, useState, useEffect, memo } from 'react'
import CartContext from '../../context/CartContext';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';

const CartHandler = memo(({ product, containerClass, isCart }) => {

  const { handleAddProduct, handleRemoveProduct, findNumberProduct, countChanged, deleteAllProductRepeats } = useContext(CartContext);
  const { text } = useContext(LanguageContext);
  const numProducts = findNumberProduct(product.id);
  const [number, setNumber] = useState(numProducts ? numProducts : 0);

  const handleCart = (product, operation) => {
    if (operation === '+') {
      handleAddProduct(product);

    } else {
      handleRemoveProduct(product);
    }
  }

  useEffect(() => {
    const total = findNumberProduct(product.id);
    setNumber(total ? total : 0);

  }, [countChanged]);


  return (
    <div className={containerClass}>
      <div className={`${containerClass}__cart`}>
        <FontAwesomeIcon className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`} onClick={() => handleCart(product, '-')} icon={faMinus} />
        <p className={`${containerClass}__cart--number ${product.stock === 0 && 'empty'}`}>{number}</p>
        <FontAwesomeIcon className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`} onClick={() => handleCart(product, '+')} icon={faPlus} />
      </div>
      {
        isCart
          ?
          (
            <div className={`${containerClass}__cart--remove`} onClick={() => deleteAllProductRepeats(product.id)}>
              <FontAwesomeIcon icon={faTrash} className={`${containerClass}__cart--remove-trash`} />
              <p className={`${containerClass}__cart--remove-text`}>{text.cart.delete}</p>
            </div>

          )
          :
          (
            <FontAwesomeIcon icon={faHeart} className={`${containerClass}__like`} />
          )
      }
    </div>
  )
})

CartHandler.propTypes = {
  product: PropTypes.object.isRequired,
  containerClass: PropTypes.string.isRequired,
  isCart: PropTypes.bool.isRequired,
}
export default CartHandler;