import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Product from './Product';


const Category = () => {

  const productsDb = require('./database.json');
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const section = type;

  useEffect(() => {
    console.log('renderizando categoria nueva');
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
  }, [section, productsDb]);

  return (
    <div className='category'>
    {console.log('renderizando categoria')}
      <h3 className="category__title">{type.toLowerCase()}</h3>
      <div className="products">
        {products.length > 0 && products.map(({ id, name, price, stock, offer }) => {
          return <Product key={id} id={id} name={name} price={parseInt(price)} type={section} stock={stock} offer={offer} />
        })}
      </div>
    </div>
  );
};

export default Category;