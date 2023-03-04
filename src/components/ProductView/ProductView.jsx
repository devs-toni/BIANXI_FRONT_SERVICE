import React, { useState, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext';
import { Details, Images, Info, Loader, Related } from '../index';
import { useParams } from 'react-router-dom';
import { productsUrl } from '../../config.js';
import { Connection } from '../../helpers/HTTP_Connection';

const ProductView = () => {

  const { id, type } = useParams();

  const { PRODUCT_ACTIONS, configureProduct } = useProduct();
  const { state: product_state, dispatch: product_dispatch } = configureProduct();

  const [image, setImage] = useState({});
  const [colorActivatorImage, setColorActivatorImage] = useState(0);

  useEffect(() => {
    const { get } = Connection();
    get(`${productsUrl}/get/${id}`)
      .then(data => {
        setImage(require(`../../assets/images/${type}/${data.name}-0.png`));
        product_dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCT, payload: { product: data } })
      });
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {
        product_state.product
          ?
          <>
            <div className="view">
              <Images
                img={image}
                name={product_state.product.name}
                activator={colorActivatorImage}
              />
              <Info
                setActivator={setColorActivatorImage}
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