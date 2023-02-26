import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import ViewImages from './ViewImages';
import ViewInfo from './ViewInfo';

const ProductView = () => {

  const { productsUrl } = require('../../config.js');
  const { id, type } = useParams();
  const [image, setImage] = useState({});
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductById = async (id) => {
      const data = await axios.get(`${productsUrl}/get/${id}`)
        .then(response => {
          return response.data;
        });
      setProduct(data);
      const image = require(`../../assets/images/${type}/${data.name}.png`);
      setImage(image);
    }
    getProductById(id);
  }, [id]);

  return (
    <>
      {
        product ?
          (
            <>
              <div className="view">
                <ViewImages img={image} name={product.name} />
                <ViewInfo product={product} type={type} />
              </div>
              <ProductDetails description={product?.description} features={product?.datasheet} />
            </>
          )
          :
          (
            <p>Loading</p>
          )
      }
    </>
  )
}

export default ProductView;