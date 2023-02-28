import axios from 'axios';
import React from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { Product } from '../index';

const Category = () => {

  const { productsUrl } = require('../../config.js');
  const { type } = useParams();
  const { vars } = useProduct();
  const { products, setProducts } = vars;

  useEffect(() => {
    const getCategoryProducts = async () => {
      const result = await axios.get(`${productsUrl}/get/type/${type}`)
        .then(response => {
          return response.data;
        });
      setProducts(result);
    }
    getCategoryProducts();
  }, [type]);

  return (
    <>
      {
        products ?
          (
            <div className='category'>
              <h3 className="category__title">{type.toLowerCase()}</h3>
              <div className="products">
                {products.length > 0 && products.map((product, index) => {
                  return <Product key={index} product={product} />
                })}
              </div>
            </div>
          )
          :
          (
            <p>Loading</p>
          )
      }
    </>
  );
};

export default Category;