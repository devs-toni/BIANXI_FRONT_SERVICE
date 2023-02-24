import React, { useState, useEffect } from 'react'
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
  }).filter(r => r.length > 0);

  const { offer, stock, colors, sizes } = result[0][0];
  const [product, setProduct] = useState({
    offer: offer ? offer : 0,
    stock: stock ? stock : 10,
    colors: colors ? colors : [],
    sizes: sizes ? sizes : [],
    ...result[0][0]
  });
  const [image, setImage] = useState({})

  useEffect(() => {
    const image = require(`../../assets/images/${type}/${product.name}.png`);
    setImage(image);
  }, [setImage])

  return (
    <>
      <div className="view">
        <ViewImages img={image} name={product.name} />
        <ViewInfo product={product} type={type} />
      </div>
      <ProductDetails />
    </>
  )
}

export default ProductView;