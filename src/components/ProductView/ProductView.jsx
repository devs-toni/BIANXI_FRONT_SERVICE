import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import ViewImages from './ViewImages';
import ViewInfo from './ViewInfo';

const productsDb = require('../Categories/database.json');
const { road, mtb, ebike, city } = productsDb.products;
const allBikes = [road, mtb, ebike, city];

const ProductView = () => {
  const { id, type } = useParams();
  const result = allBikes.map(section => {
    return section.filter(bike => parseInt(bike.id) === parseInt(id));
  });
  const [product, setProduct] = useState(result[0][0]);

  return (
    <div className="view">
      <ViewImages />
      <ViewInfo product={product} type={type} />
      <ProductDetails />
    </div>
  )
}

export default ProductView