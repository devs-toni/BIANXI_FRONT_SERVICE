import React, { useContext, useState, useEffect } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { setProductPrice, isEmptyMethod } from '../../helpers/utils';
import { Badge, ProductBox } from '../index';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const Product = ({ product, total = 1 }) => {
  const { text } = useContext(LanguageContext);
  const { id, name, price, type, offer, sentence, description, datasheet, configuration, orders } = product;
  const [updatePrices, setUpdatePrices] = useState(null)
  const [isEmptyProduct, setIsEmptyProduct] = useState(false);
  const [image, setImage] = useState(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);



  useEffect(() => {

    setUpdatePrices(setProductPrice(offer, price));
    setImage(require(`../../assets/images/${type}/${name}.png`));
    setIsEmptyProduct(isEmptyMethod(configuration));

  }, [product])



  return (
    <>
      {
        updatePrices
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
          <p>Loading Product ....</p>
      }
    </ >
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  total: PropTypes.number
}

export default Product;