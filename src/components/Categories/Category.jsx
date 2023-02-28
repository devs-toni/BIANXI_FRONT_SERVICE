import React from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { Product } from '../index';
import { get } from '../../helpers/rest';
import { productsUrl } from '../../config.js';

const Category = () => {

  const { type } = useParams();
  const { vars } = useProduct();
  const { products, setProducts } = vars;

  useEffect(() => {
    get(setProducts, `${productsUrl}/get/type/${type}`);
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