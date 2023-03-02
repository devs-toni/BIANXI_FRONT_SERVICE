import React, { useState, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext';
import { Details, Images, Info, Loader } from '../index';
import { useParams } from 'react-router-dom';
import { get } from '../../helpers/rest';
import { productsUrl } from '../../config.js';

const ProductView = () => {

  const { id, type } = useParams();

  const { vars } = useProduct();
  const { current: product, setCurrent: setProduct } = vars;

  const [image, setImage] = useState({});

  const [colorActivatorImage, setColorActivatorImage] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      const name = await get(setProduct, `${productsUrl}/get/${id}`, true);
      setImage(require(`../../assets/images/${type}/${name}-0.png`));
    }
    getProduct();
  }, [id]);

  return (
    <>
      {
        product
          ?
          <>
            <div className="view">
              <Images img={image} name={product.name} activator={colorActivatorImage} />
              <Info setActivator={setColorActivatorImage} />
            </div>
            <Details description={product?.description} features={product?.datasheet} />
          </>
          :
          <Loader />
      }
    </>
  )
}

export default ProductView;