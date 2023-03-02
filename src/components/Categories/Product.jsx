import React, { useState, useEffect } from 'react'
import { setProductPrice, isEmptyMethod } from '../../helpers/utils';
import { Badge, Loader, ProductBox } from '../index';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';


const Product = ({ product, total = 1 }) => {
  
  const { text } = useLanguage();

  const { id, name, price, type, offer, sentence, description, datasheet, configuration, orders } = product;
  const [updatePrices, setUpdatePrices] = useState(null)
  const [isEmptyProduct, setIsEmptyProduct] = useState(false);
  const [image, setImage] = useState(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {
    setUpdatePrices(setProductPrice(offer, price));
    setImage(require(`../../assets/images/${type}/${name}-0.png`));
    setIsEmptyProduct(isEmptyMethod(configuration));
    setLoaded(true);
  }, [product])



  return (

    <div className='products__product'>
      {
        loaded
          ?
          (
            <div className='products__product'>
              {
                offer > 0 &&
                <Badge
                  containerClass="offer"
                  text={text.product.offer}
                />
              }
              <ProductBox
                name={name}
                finalPrice={updatePrices.final}
                initPrice={updatePrices.init === 0 ? `${updatePrices.init}` : updatePrices.init}
                image={image}
                loaded={isImgLoaded}
                setLoaded={setIsImgLoaded}
                containerClass='product-box'
                offer={offer}
                isCart={false}
                isEmpty={isEmptyProduct}
              />
              < NavLink to={`/product/options/${type}/${id}`} className='products__product--visit'>{text.product.view}</NavLink>
              {
                isEmptyProduct
                &&
                <Badge
                  containerClass="empty-product"
                  text={text.product.empty}
                />
              }
            </div>
          )
          :
          <Loader />
      }
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  total: PropTypes.number
}

export default Product;