import { useState } from 'react';
import { useEffect } from "react";
import { useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import { productsUrl } from '../../config.js';
import { http } from '../../helpers/http';
import PropTypes from 'prop-types';
import { getProductRelateds } from '../../helpers/utils';

const Related = ({ type, price }) => {

  const { text } = useLanguage();

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    http().get(`${productsUrl}/get/type/${type}`)
      .then(data => {
        setRelatedProducts(getProductRelateds(data, price))
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {
        relatedProducts
          ?
          (
            <div className="related">
              <h3 className="related__title">{text.view.relatedTitle}</h3>
              <div className="relate-products">
                {
                  relatedProducts.length > 0
                    ?
                    relatedProducts.map((product, index) => {
                      return <Product
                        key={index}
                        product={product}
                        isSearch={false}
                        isRelated={true}
                        containerClass="relate-products"
                        boxClass="relate-product-box"
                      />
                    })
                    :
                    <></>
                }
              </div>
            </div>
          )
          :
          (
            <Loader />
          )
      }
    </>
  );
};

Related.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default Related;