import { useParams } from 'react-router-dom';
import { useGlobal, useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { http } from '../../helpers/http';
import { PRODUCTS_ENDPOINT } from '../../configuration';

const Category = ({ category, container, box, title }) => {

  const { text } = useLanguage();
  const { type, search } = useParams();

  const { allProducts } = useGlobal();
  const { products } = allProducts;
  const [categoryProducts, setCategoryProducts] = useState([])
  const { userState } = useAuth();

  useEffect(() => {
    if (products) {
      if (type)
        setCategoryProducts(products.filter(p => p.type === type));
      else if (search)
        setCategoryProducts(products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [type, search, products])

  useEffect(() => {
    if (products && !type && !search) {
        http().get(`${PRODUCTS_ENDPOINT}/get/favourites/${userState.id}`)
          .then(data => setCategoryProducts(data))
          .catch(error => console.error(error));
    }
  }, [products, categoryProducts])

  const setTitle = title ? title : (type ? type.toLowerCase() : `${categoryProducts?.length} ${text.search.title} ${search}`);

  return (
    <>
      {
        (categoryProducts && products) ?
          (
            <div className={category}>
              <h3 className={`${category}__title`}>{setTitle}</h3>
              <div className={container}>
                {
                  categoryProducts.length > 0
                    ?
                    categoryProducts.map((product, index) => {
                      return <Product
                        key={index}
                        product={product}
                        isSearch={type ? false : true}
                        isLike={(!type && !search) ? true : false}
                        isRelated={false}
                        containerClass={container}
                        boxClass={box}
                      />
                    })
                    :
                    <FontAwesomeIcon className={`${category}__empty`} icon={faHourglass} />
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

Category.propTypes = {
  category: PropTypes.string.isRequired,
  container: PropTypes.string.isRequired,
  box: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Category;