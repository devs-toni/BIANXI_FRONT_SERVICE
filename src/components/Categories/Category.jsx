import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import { PRODUCTS_ENDPOINT } from '../../configuration.js';
import { http } from '../../helpers/http';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

const Category = ({ category, container, box, title }) => {

  const { text } = useLanguage();
  const { type, search } = useParams();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { user_state } = useAuth();

  useEffect(() => {

    if (search) {
      http().get(`${PRODUCTS_ENDPOINT}/search/${search}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
      return;
    }

    if (type) {
      http().get(`${PRODUCTS_ENDPOINT}/get/type/${type}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
      return;
    }

    if (user_state.id) {
      http().get(`${PRODUCTS_ENDPOINT}/get/favourites/${user_state.id}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
    } else {
      navigate("/");
    }
  }, [type, search, products]);

  const setTitle = title ? title : (type ? type.toLowerCase() : `${products?.length} ${text.search.title} ${search}`);

  return (
    <>
      {
        products ?
          (
            <div className={category}>
              <h3 className={`${category}__title`}>{setTitle}</h3>
              <div className={container}>
                {
                  products.length > 0
                    ?
                    products.map((product, index) => {
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