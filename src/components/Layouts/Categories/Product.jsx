import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react'
import LanguageContext from '../../../context/LanguageContext';
import CartContext from '../../../context/CartContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import useFormatNumber from '../../useFormatNumber';

const Product = ({ id, name, price, toPrice, type, offer, stock }) => {

  const { text } = useContext(LanguageContext);
  const { handleAddProduct, handleRemoveProduct , findProductsById } = useContext(CartContext);

  const { formatNumberES } = useFormatNumber();

  const [image, setImage] = useState();
  const [productSave, setProductSave] = useState({});

  const [initPrice, setInitPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [toFinalPrice, setToFinalPrice] = useState(0);

  const [productsInCart, setProductsInCart] = useState(0);

  useEffect(() => {
    setImage(require?.(`../../../assets/images/${type}/${name}.png`));

    const numProducts = findProductsById(id);
    numProducts && setProductsInCart(numProducts.length);

    if (offer > 0) {
      const percentage = Math.ceil((parseInt(price) * offer) / 100);
      setFinalPrice(formatNumberES(price - percentage, 2));
      setInitPrice(formatNumberES(price, 2));
    } else {
      setToFinalPrice(formatNumberES(toPrice, 2));
      setFinalPrice(formatNumberES(price, 2));
    }
    setProductSave({
      id,
      name,
      price,
      toPrice,
      finalPrice: finalPrice,
      type,
      offer,
      stock
    });
  }, [id]);

  const handleCart = (product, operation) => {
    if (operation === '+') {
      handleAddProduct(product);
      setProductsInCart(prevState => prevState + 1);
    } else {
      handleRemoveProduct(product);
      if (productsInCart > 0) setProductsInCart(prevState => prevState - 1);
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
          <p className={`products__product--price-container-price ${offer && 'erased'}`}>{offer > 0 ? initPrice : finalPrice} € {toPrice && ` - ${toFinalPrice} €`}</p>
          {offer > 0 && <p className='products__product--price-container-price offer-price'>{finalPrice} €</p>}
        </div>
        <div className="products__product--options">
          <div className="products__product--options-btn">
            <div>
              <FontAwesomeIcon className={`cart ${stock === 0 && 'empty'}`} onClick={() => handleCart(productSave, '-')} icon={faMinus} />
              <p className={`${stock === 0 && 'empty'}`}>{productsInCart}</p>
              <FontAwesomeIcon className={`cart ${stock === 0 && 'empty'}`} onClick={() => handleCart(productSave, '+')} icon={faPlus} />
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
  )
}

export default Product;