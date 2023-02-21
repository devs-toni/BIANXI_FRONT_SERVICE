import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react'
import LanguageContext from '../../../context/LanguageContext';
import CartContext from '../../../context/CartContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Product = ({ name, price, toPrice, type, offer, stock }) => {

  const { text } = useContext(LanguageContext);
  const { handleAddCart, getTotalProducts } = useContext(CartContext)

  const [image, setImage] = useState();
  const [productSave, setProductSave] = useState({});

  const [initPrice, setInitPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [toFinalPrice, setToFinalPrice] = useState(0);

  const [productsInCart, setProductsInCart] = useState(0);

  useEffect(() => {
    setPreConfigProduct();
    preparePrices();
  }, [name]);

  const setPreConfigProduct = () => {
    setImage(require?.(`../../../assets/images/${type}/${name}.png`));
    setProductsInCart(0);
    let numberOfArticles = getTotalProducts(name);
    setProductsInCart(numberOfArticles.length);
  };

  const preparePrices = () => {
    setProductSave({
      name,
      price,
      toPrice,
      finalPrice: finalPrice,
      type,
      offer,
      stock
    });
    if (offer > 0) {
      const percentage = Math.ceil((parseInt(price) * offer) / 100);
      setFinalPrice(formatNumberES(price - percentage, 2));
      setInitPrice(formatNumberES(price, 2));
    } else {
      setToFinalPrice(formatNumberES(toPrice, 2));
      setFinalPrice(formatNumberES(price, 2));
    }
  }

  const formatNumberES = (n, d = 0) => {
    n = new Intl.NumberFormat("de-DE").format(parseFloat(n).toFixed(d));
    if (d > 0) {
      const decimals = n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;
      n = (decimals === 0) ? n + "," + "0".repeat(d) : n + "0".repeat(d - decimals);
    }
    return n;
  }

  const handleCart = (product, operation) => {
    if (operation === '+') {
      handleAddCart(product);
      setProductsInCart(prevState => prevState + 1);
    } else {

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