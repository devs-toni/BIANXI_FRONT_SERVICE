import React, { useContext, useState } from 'react'
import CartContext from '../../../context/CartContext';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const CartHandler = ({ id, stock, product }) => {

  const { totalProducts, handleAddProduct, handleRemoveProduct, findNumberProduct } = useContext(CartContext);
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
    <div className="products__product--options-btn">
      <div>
        <FontAwesomeIcon className={`cart ${stock === 0 && 'empty'}`} onClick={() => handleCart(product, '-')} icon={faMinus} />
        <p className={`${stock === 0 && 'empty'}`}>{number}</p>
        <FontAwesomeIcon className={`cart ${stock === 0 && 'empty'}`} onClick={() => handleCart(product, '+')} icon={faPlus} />
      </div>
      <FontAwesomeIcon icon={faHeart} />
    </div>
  )
}

export default CartHandler;