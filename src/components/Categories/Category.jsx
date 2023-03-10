import { useParams } from 'react-router-dom';
import { useGlobal, useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { http } from '../../helpers/http';
import { PRODUCTS_ENDPOINT } from '../../config/configuration';
import { Slider } from '@mui/material';

const Category = ({ category, container, box, title }) => {

  const { text } = useLanguage();
  const { type, search, section } = useParams();

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
      else if (section)
        setCategoryProducts(products);
      else
        http().get(`${PRODUCTS_ENDPOINT}/get/favourites/${userState.id}`)
          .then(data => setCategoryProducts(data))
          .catch(error => console.error(error));
    }
  }, [type, search, products])


  const setTitle = title ? title : (type ? type.toLowerCase() : (search ? `${categoryProducts?.length} ${text.search.title} ${search}` : text.header.promo));

  return (
    <>
      {
        (categoryProducts && products) ?
          (
            <div className={category}>
              <h3 className={`${category}__title`}>{setTitle}</h3>

              {
                section
                &&
                <div className={`${category}__filter`}>
                  <div className={`${category}__filter--price`}>
                      <Slider
                        size="small"
                        defaultValue={70}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                      />
                  </div>
                </div>
              }
              <div className={container}>
                {
                  categoryProducts.length > 0
                    ?
                    categoryProducts.map((product, index) => {
                      return <Product
                        key={index}
                        product={product}
                        isSearch={search ? true : false}
                        isLike={(!type && !search && !section) ? true : false}
                        isRelated={false}
                        isAll={section ? true : false}
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