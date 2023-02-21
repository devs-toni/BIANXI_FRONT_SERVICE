/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useState, useEffect } from 'react'
import LanguageContext from '../../../context/LanguageContext';
import { setProductPrice } from '../../../helpers/utils';
import CartHandler from './CartHandler';
import Badge from './Badge';

const Product = ({ id, name, price, type, offer = 0, stock = 10, count = 1 }) => {

  const { text } = useContext(LanguageContext);

  const [image, setImage] = useState({});
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

  useEffect(() => {
    const image = require(`./../../../assets/images/${type}/${name}.png`);
    setImage(image);
  }, [setImage, name])

  return (
    <div className='products__product'>
      {
        offer > 0 && <Badge classAttribute="offer" text={text.product.offer} />
      }
      <div>
        <img className={`products__product--image ${stock === 0 && 'empty'}`} src={image} alt={name} />
        <p className='products__product--name'>{name}</p>
        <div className='products__product--price-container'>
          <p className={`products__product--price-container-price ${offer && 'erased'}`}>{offer > 0 ? init : final} €</p>
          {offer > 0 && <p className='products__product--price-container-price offer-price'>{final} €</p>}
        </div>
        <div className="products__product--options">
          <CartHandler id={id} stock={stock} product={productToSave} />
        </div>
      </div>
      {
        stock === 0 && 
        <div className='empty-product'>
          <p>{text.product.empty}</p>
        </div>
      }
    </div >
  );
};

export default Product;