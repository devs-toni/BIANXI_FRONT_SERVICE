import { useParams } from 'react-router-dom';
import { useGlobal, useLanguage } from '../../context/GlobalContext';
import { useUI } from '../../context/UIContext';
import { Filter, Loader, Product } from '../index';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { http } from '../../helpers/http';
import { PRODUCTS_ENDPOINT, UI_SECTIONS, UI_ACTIONS } from '../../config/configuration';



const Category = ({ category, container, box, title }) => {

  const { text } = useLanguage();
  const { type, search, section } = useParams();

  const { allProducts } = useGlobal();
  const { products } = allProducts;
  const [categoryProducts, setCategoryProducts] = useState([])
  const { userState } = useAuth();
  const { handleUi } = useUI();


  useEffect(() => {
    if (products) {
      if (type)
        setCategoryProducts(products.filter(p => p.type === type));
      else if (search)
        setCategoryProducts(products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())));
      else if (section)
        setCategoryProducts(products.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
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
        (categoryProducts && products)
          ?
          (
            <>
              <div className={category}>
                <h3 className={`${category}__title`}>{setTitle}</h3>
                {
                  section
                  &&
                  <div className={`${category}__filter`}>
                    <button onClick={() => handleUi(UI_SECTIONS.FILTER, UI_ACTIONS.HANDLE)} className={`${category}__filter--title`}><FontAwesomeIcon icon={faSliders} />{text.filters.btn}</button>
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
              <Filter products={products} setProducts={setCategoryProducts} />
            </>
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