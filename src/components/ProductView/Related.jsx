import { useState } from 'react';
import { useEffect } from "react";
import { useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import PropTypes from 'prop-types';
import { getProductRelateds } from '../../helpers/utils';
import { useQueryGetRelatedProducts } from '../../persistence/products';

const Related = ({ type, price, id }) => {

  const { text } = useLanguage();

  const [relatedProducts, setRelatedProducts] = useState([]);

  const { data: relatedData, status: relatedStatus } = useQueryGetRelatedProducts(type);

  useEffect(() => {
    if (relatedStatus === 'success') setRelatedProducts(getProductRelateds(relatedData, price, id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, relatedData, relatedStatus]);

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
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}

export default Related;