import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Product from './Product';


const Category = () => {

  const productsDb = require('./database.json');
  const { type } = useParams();
  const section = type && type;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    initialize();
  }, [section]);

  const initialize = () => {
    setProducts([]);
    switch (section) {
      case 'road':
        setProducts(productsDb.products.road);
        break;
      case 'mtb':
        setProducts(productsDb.products.mtb);
        break;
      case 'ebike':
        setProducts(productsDb.products.ebike);
        break;
      case 'city':
        setProducts(productsDb.products.city);
        break;
      default:
        setProducts([]);
        break;
    }
  }

  return (
    <div className='category'>
      <h3 className="category__title">{type.toLowerCase()}</h3>
      <div className="products">
        {products.length > 0 && products.map(({ name, since, until, offer, stock }, index) => {
          return <Product key={index} name={name} price={since} toPrice={until} type={type} offer={offer} stock={stock} />
        })}
      </div>
    </div>
  )
}

export default Category;