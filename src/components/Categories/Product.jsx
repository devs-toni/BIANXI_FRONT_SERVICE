/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { setProductPrice } from '../../helpers/utils';
import CartHandler from './CartHandler';
import Badge from './Badge';
import ProductBox from './ProductBox';
import PropTypes from 'prop-types';

const Product = ({ id, name, price, type, offer = 10, stock = 10, total = 1 }) => {

  const { text } = useContext(LanguageContext);
  const { final, init } = setProductPrice(offer, price);
  const [image, setImage] = useState(name)
  const [loaded, setLoaded] = useState(false);
  const productToSave = {
    id,
    name,
    init,
    final,
    type,
    offer,
    stock,
    total
  };

  useEffect(() => {
    const image = require(`../../assets/images/${type}/${name}.png`);
    setImage(image);
  }, [setImage])


  return (
    <div className='products__product'>
      {
        offer > 0 &&
        <Badge
          containerClass="offer"
          text={text.product.offer} />
      }
      <ProductBox
        id={id}
        name={name}
        finalPrice={final}
        initPrice={init}
        image={image}
        loaded={loaded}
        setLoaded={setLoaded}
        containerClass='product-box'
        offer={offer}
        stock={stock}
      />
      <CartHandler
        product={productToSave}
        containerClass='cart-buttons'
        stock={stock}
      />
      {
        stock === 0 &&
        <Badge
          containerClass="empty-product"
          text={text.product.empty} />
      }
    </div >
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  offer: PropTypes.number,
  stock: PropTypes.number,
  total: PropTypes.number,
}

export default Product;