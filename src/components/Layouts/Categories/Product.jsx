import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import LanguageContext from '../../../context/LanguageContext';
import CartContext from '../../../context/CartContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { setProductPrice } from '../../../utils/utils';

const Product = ({ id, name, price, type, offer = 10, stock = 20, count = 0 }) => {

  const image = require(`../../../assets/images/${type}/${name}.png`);

  const { text } = useContext(LanguageContext);
  const { handleAddProduct, handleRemoveProduct, findProductsById } = useContext(CartContext);
  
  const numProducts = findProductsById(id);
  const [number, setNumber] = useState(numProducts ? numProducts.length : 0);

  const { final, init } = setProductPrice(offer, price);
  const productToSave = {
    id,
    name,
    init,
    final,
    type,
    offer,
    count
  };

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
    <div className='products__product'>
      {
        offer > 0 &&
        <div className='offer'>
          <p>{text.product.offer}</p>
        </div>
      }
      <div>
        <img className={`products__product--image ${stock === 0 && 'empty'}`} src={image} alt={name} />
        <p className='products__product--name'>{name}</p>
        <div className='products__product--price-container'>
          <p className={`products__product--price-container-price ${offer && 'erased'}`}>{offer > 0 ? init : final} €</p>
          {offer > 0 && <p className='products__product--price-container-price offer-price'>{final} €</p>}
        </div>
        <div className="products__product--options">
          <div className="products__product--options-btn">
            <div>
              <FontAwesomeIcon className={`cart ${stock === 0 && 'empty'}`} onClick={() => handleCart(productToSave, '-')} icon={faMinus} />
              <p className={`${stock === 0 && 'empty'}`}>{number}</p>
              <FontAwesomeIcon className={`cart ${stock === 0 && 'empty'}`} onClick={() => handleCart(productToSave, '+')} icon={faPlus} />
            </div>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
      {
        stock === 0 &&
        < div className="empty-product">
          <p>{text.product.empty}</p>
        </div>
      }
    </div >
  );
};

export default Product;