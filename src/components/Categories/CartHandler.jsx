import React, { useContext, useState, useEffect, memo, useRef } from 'react'
import CartContext from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';

const CartHandler = memo(({ product, containerClass, isCart }) => {

  const { text } = useContext(LanguageContext);
  const inputNumber = useRef();

  // CartHandler synchronized with all the products saved in the cart // IS CART
  const { handleAddProduct, handleRemoveProduct, findNumberProduct, countChanged, deleteAllProductRepeats } = useContext(CartContext);
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


  // CartHandler with previous number selection and after this you can add all of them to the cart // IS NOT CART

  const [currentValue, setCurrentValue] = useState(number)

  const addCount = () => {
    const next = parseInt(inputNumber.current.value) + 1;
    inputNumber.current.value = next <= product.stock ? setCurrentValue(parseInt(next)) : inputNumber.current.value;
    
  }

  const removeCount = () => {
    const next = parseInt(inputNumber.current.value) - 1;
    inputNumber.current.value = next > 0 ? setCurrentValue(parseInt(next)) : inputNumber.current.value;

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
              <p className={`${containerClass}__cart--number ${product.stock === 0 && 'empty'}`}>{number}</p>
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
                value={currentValue}
                onChange={() => {}}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                ref={inputNumber}
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
}
export default CartHandler;