import React, { useState, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext';
import { Details, Images, Info, Loader, Related } from '../index';
import { useParams } from 'react-router-dom';
import { productsUrl } from '../../config.js';
import { Connection } from '../../helpers/HTTP_Connection';
import { setProductConfigurations } from '../../helpers/utils';

const ProductView = () => {

  const { id, type } = useParams();

  const { handleProduct } = useProduct();
  const { state: product_state, dispatch: product_dispatch, PRODUCT_ACTIONS } = handleProduct();

  const [colorActivatorImage, setColorActivatorImage] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadProduct = async () => {
      const { get } = Connection();
      await get(`${productsUrl}/get/${id}`)
        .then(data => {
          product_dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCT, payload: data })
          const { sizes } = setProductConfigurations(data);
          product_dispatch({ type: PRODUCT_ACTIONS.SET_SIZES, payload: [...sizes] });
          const { colors: res, colorsIds: ids } = setProductConfigurations(data);
          const finalArray = [];
          [...res].forEach((c, index) => {
            finalArray.push({ color: c, id: [...ids][index] });
          });
          product_dispatch({ type: PRODUCT_ACTIONS.SET_COLORS, payload: finalArray });
          setLoading(false);
        });
    }

    loadProduct();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {
        !loading
          ?
          <>
            <div className="view">
              <Images
                product={product_state.product}
                activator={colorActivatorImage}
              />
              <Info
                setColorActivator={setColorActivatorImage}
                handleLike={() => { product_dispatch({ type: PRODUCT_ACTIONS.HANDLE_LIKE }) }}
                isLike={product_state.like}
              />
            </div>
            <Details
              description={product_state.product.description}
              features={product_state.product.datasheet}
            />
            <Related
              type={type}
              price={product_state.product.price}
            />
          </>
          :
          <Loader />
      }
    </>
  )
}

export default ProductView;