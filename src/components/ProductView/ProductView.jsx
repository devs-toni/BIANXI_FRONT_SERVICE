import React, { useState, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext';
import { Details, Images, Info } from '../index';
import { useParams } from 'react-router-dom';
import { get } from '../../helpers/rest';
import { productsUrl } from '../../config.js';

const ProductView = () => {

  const { id, type } = useParams();

  const { vars } = useProduct();
  const { current: product, setCurrent: setProduct } = vars;
  const [image, setImage] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const name = await get(setProduct, `${productsUrl}/get/${id}`, true);
      setImage(require(`../../assets/images/${type}/${name}.png`));
    }
    getProduct();
  }, [id]);

  return (
    <>
      {
        product ?
          <>
            <div className="view">
              <Images img={image} name={product.name} />
              <Info product={product} type={type} />
            </div>
            <Details description={product?.description} features={product?.datasheet} />
          </>
          :
          <p>Loading</p>
      }
    </>
  )
}

export default ProductView;