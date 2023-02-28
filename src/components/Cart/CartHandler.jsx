import React, { useContext, useState, useEffect, memo } from 'react'
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';

const CartHandler = memo(({ product, containerClass, isCart }) => {

  const { text } = useContext(LanguageContext);

  const { vars: cartVars, funcs, extra } = useCart();
  const { totalProducts } = cartVars;
  const { handleAddProduct, handleRemoveProduct } = funcs;
  const { findNumberProduct, deleteAllProductRepeats } = extra;

  const { vars: productVars } = useProduct();
  const { color, size } = productVars;

  const numProducts = findNumberProduct(product.id);

  // CartHandler synchronized with all the products saved in the cart // IS CART

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


  // CartHandler with previous number selection and after this you can add all of them to the cart // IS NOT CART


  const [tempNumber, setTempNumber] = useState(numProducts ? numProducts : 0);

  const addCount = () => {
    getConfigurationStock();
    setTempNumber(prevState => prevState + 1);
  }

  const removeCount = () => {
    if (tempNumber > 0)
      setTempNumber(prevState => prevState - 1);
  }

  const getConfigurationStock = () => {
    console.log(color);
    console.log(size);
  }

  useEffect(() => {
    const total = findNumberProduct(product.id);
    setTempNumber(total ? total : 0);
  }, [totalProducts])


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