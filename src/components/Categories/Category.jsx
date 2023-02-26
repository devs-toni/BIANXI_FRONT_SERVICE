import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Product from './Product';

const Category = () => {

  const { productsUrl } = require('../../config.js');
  const { type } = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setProducts([]);
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
              {console.log(products)}
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