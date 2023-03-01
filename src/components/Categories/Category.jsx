import React from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { Product } from '../index';
import { get } from '../../helpers/rest';
import { productsUrl } from '../../config.js';

const Category = () => {

  const { type } = useParams();
  const { products } = useGlobal();
  const { products: allProducts, setProducts } = products;


  useEffect(() => {
    get(setProducts, `${productsUrl}/get/type/${type}`);
  }, [type]);

  return (
    <>
      {
        allProducts ?
          (
            <div className='category'>
              <h3 className="category__title">{type.toLowerCase()}</h3>
              <div className="products">
                {allProducts.length > 0 && allProducts.map((product, index) => {
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