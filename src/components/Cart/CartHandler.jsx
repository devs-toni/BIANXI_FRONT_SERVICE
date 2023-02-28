import React, { useContext, useState, useEffect, memo, useRef } from 'react'
import CartContext from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';

const CartHandler = memo(({ product, containerClass, isCart, innerRef }) => {

  const { text } = useContext(LanguageContext);

  // CartHandler synchronized with all the products saved in the cart // IS CART
  const { totalProducts, handleAddProduct, handleRemoveProduct, findNumberProduct, countChanged, deleteAllProductRepeats } = useContext(CartContext);
  const numProducts = findNumberProduct(product.id);

  const [currentNumber, setCurrentNumber] = useState(numProducts);
  const [tempNumber, setTempNumber] = useState(numProducts ? numProducts : 0);

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
    setTempNumber(total ? total : 0);
  }, [numProducts, countChanged, totalProducts])


  // CartHandler with previous number selection and after this you can add all of them to the cart // IS NOT CART

  const addCount = () => {
    const next = parseInt(innerRef.current.value) + 1;
    innerRef.current.value = next <= product.stock ? setTempNumber(parseInt(next)) : innerRef.current.value;

  }

  const removeCount = () => {
    const next = parseInt(innerRef.current.value) - 1;
    innerRef.current.value = next >= 0 ? setTempNumber(parseInt(next)) : innerRef.current.value;
  }



  return (
    <div className={containerClass}>
      {
        isCart
          ?
          <>
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
          </>
          :
          <>
            <div className={`${containerClass}__cart`}>
              <FontAwesomeIcon
                className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`}
                icon={faMinus}
                onClick={removeCount}
              />
              <input
                type="text"
                max={product.stock}
                min={0}
                className={`${containerClass}__cart--number ${product.stock === 0 && 'empty'}`}
                value={tempNumber}
                onChange={() => { }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                ref={innerRef}
              />
              <FontAwesomeIcon
                className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`}
                icon={faPlus}
                onClick={addCount}
              />
            </div>
          </>
      }

    </div>
  )
})

CartHandler.propTypes = {
  product: PropTypes.object.isRequired,
  containerClass: PropTypes.string.isRequired,
  isCart: PropTypes.bool.isRequired,
  innerRef: PropTypes.object,
}
export default CartHandler;