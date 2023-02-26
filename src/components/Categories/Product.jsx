/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { setProductPrice } from '../../helpers/utils';
import Badge from './Badge';
import ProductBox from './ProductBox';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Product = ({ product, total = 1 }) => {

  const { name, price, type, offer, configuration } = product;

  const { text } = useContext(LanguageContext);

  const [image, setImage] = useState()
  const [imgLoaded, setImgLoaded] = useState(false);

  const [loadedProduct, setLoadedProduct] = useState(null);

  useEffect(() => {
    const { final: finalPrice, init: initPrice } = setProductPrice(offer, price);
    const image = require(`../../assets/images/${type}/${name}.png`);
    setImage(image);
    const isEmpty = isEmptyMethod(configuration);
    setLoadedProduct({ ...product, initPrice, finalPrice, total, isEmpty });
  }, [product]);

  const isEmptyMethod = (configurations) => {
    let sumStock = 0;
    configurations.forEach(({ stock }) => {
      sumStock += stock;
    })
    return sumStock === 0 ? true : false;
  }

  return (
    <>
      {loadedProduct != null ?
        (
          <div className='products__product'>
            {
              loadedProduct.offer > 0 &&
              <Badge
                containerClass="offer"
                text={text.product.offer}
              />
            }
            < ProductBox
              id={loadedProduct.id}
              name={loadedProduct.name}
              price={loadedProduct.price}
              finalPrice={loadedProduct.finalPrice}
              initPrice={typeof (loadedProduct.initPrice) === "string" ? loadedProduct.initPrice : `${loadedProduct.initPrice}`}
              image={image}
              loaded={imgLoaded}
              setLoaded={setImgLoaded}
              containerClass='product-box'
              offer={loadedProduct.offer}
              isCart={false}
              isEmpty={loadedProduct.isEmpty ? loadedProduct.isEmpty : false}
            />
            < NavLink to={`/product/options/${loadedProduct.type}/${loadedProduct.id}`} className='products__product--visit'>{text.product.view}</NavLink>
            {
              loadedProduct.isEmpty &&
              <Badge
                containerClass="empty-product"
                text={text.product.empty}
              />
            }
          </div>
        )
        :
        <p>Loading</p>
      }
    </ >
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  total: PropTypes.number
}

export default Product;