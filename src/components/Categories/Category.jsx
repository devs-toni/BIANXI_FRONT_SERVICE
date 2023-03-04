import React from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useGlobal, useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import { productsUrl } from '../../config.js';
import { Connection } from '../../helpers/HTTP_Connection';

const Category = () => {

  const { text } = useLanguage();
  const { type, name } = useParams();
  const { products } = useGlobal();
  const { products: allProducts, setProducts } = products;

  useEffect(() => {
    const { get } = Connection();

    name && get(`${productsUrl}/search/${name}`)
      .then(data => setProducts(data))
      .catch(error => console.error(error));

    type && get(`${productsUrl}/get/type/${type}`)
      .then(data => setProducts(data))
      .catch(error => console.error(error));

  }, [type, name]);

  
  const setTitle = type ? type.toLowerCase() : `${allProducts?.length} ${text.search.title} ${name}`;
  const classTitle = type ? "category" : "search-category";
  const containerClass = type ? 'products' : 'search-products';
  const boxClass = type ? 'product-box' : 'search-product-box';

  return (
    <>
      {
        allProducts ?
          (
            <div className={classTitle}>
              <h3 className={`${classTitle}__title`}>{setTitle}</h3>
              <div className={containerClass}>
                {
                  allProducts.length > 0
                    ?
                    allProducts.map((product, index) => {
                      return <Product
                        key={index}
                        product={product}
                        isSearch={type ? false : true}
                        isRelated={false}
                        containerClass={containerClass}
                        boxClass={boxClass}
                      />
                    })
                    :
                    <></>
                }
              </div>
            </div>
          )
          :
          (
            <Loader />
          )
      }
    </>
  );
};

export default Category;