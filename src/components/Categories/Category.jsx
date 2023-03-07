import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import { productsUrl } from '../../config.js';
import { http } from '../../helpers/http';
import PropTypes from 'prop-types';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

const Category = ({ category, container, box, title }) => {

  const { text } = useLanguage();
  const { type, search } = useParams();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { handleUser } = useUser();
  const { state: user_state } = handleUser();


  useEffect(() => {

    if (search) {
      http().get(`${productsUrl}/search/${search}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
      return;
    }

    if (type) {
      http().get(`${productsUrl}/get/type/${type}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
      return;
    }

    if (user_state.id) {
      http().get(`${productsUrl}/get/favourites/${user_state.id}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
    } else {
      navigate("/");
    }
  }, [type, search]);

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