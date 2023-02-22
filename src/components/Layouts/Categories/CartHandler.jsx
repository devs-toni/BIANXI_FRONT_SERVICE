import React, { useContext, useState } from 'react'
import CartContext from '../../../context/CartContext';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const CartHandler = ({ id, stock, product, containerClass }) => {

  const { handleAddProduct, handleRemoveProduct, findNumberProduct } = useContext(CartContext);
  const numProducts = findNumberProduct(id);
  const [number, setNumber] = useState(numProducts ? numProducts : 0);

  const handleCart = (product, operation) => {
    if (operation === '+') {
      handleAddProduct(product);
      setNumber(prevState => prevState + 1);

    } else {
      handleRemoveProduct(product);
      if (number > 0) setNumber(prevState => prevState - 1);
    }
  }

  return (
    <div className={containerClass}>
      <div className={`${containerClass}__cart`}>
        <FontAwesomeIcon className={`${containerClass}__cart--handle ${stock === 0 && 'empty'}`} onClick={() => handleCart(product, '-')} icon={faMinus} />
        <p className={`${containerClass}__cart--number ${stock === 0 && 'empty'}`}>{number}</p>
        <FontAwesomeIcon className={`${containerClass}__cart--handle ${stock === 0 && 'empty'}`} onClick={() => handleCart(product, '+')} icon={faPlus} />
      </div>
      <FontAwesomeIcon icon={faHeart} className={`${containerClass}__like`} />
    </div>
  )
}

CartHandler.propTypes = {
  id : PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  containerClass: PropTypes.string.isRequired
}
export default CartHandler;