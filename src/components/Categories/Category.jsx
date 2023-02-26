import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Product from './Product';

const Category = () => {

  const { productsUrl } = require('../../config.js');
  const { type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
    axios.get(`${productsUrl}/get/type/${type}`)
      .then(response => {
        console.log(response);
        setProducts(response.data);
      })
  }, [type]);

  return (
    <div className='category'>
      <h3 className="category__title">{type.toLowerCase()}</h3>
      <div className="products">
        {products.length > 0 && products.map(({ id, name, price, stock, offer, ...other }) => {
          return <Product key={id} id={id} name={name} price={price} type={type} stock={stock} offer={offer} rest={other} />
        })}
      </div>
    </div>
  );
};

export default Category;