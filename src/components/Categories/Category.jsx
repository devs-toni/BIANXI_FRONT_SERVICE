import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobal, useLanguage } from '../../context/GlobalContext';
import { Loader, Product } from '../index';
import { productsUrl } from '../../config.js';
import { http } from '../../helpers/http';
import PropTypes from 'prop-types';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

const Category = ({ category, container, box, title }) => {

  const { text } = useLanguage();
  const { type, name } = useParams();
  const navigate = useNavigate();
  const { products } = useGlobal();
  const { products: allProducts, setProducts } = products;

  const { ACTIONS, handleUser } = useUser();
  const { state: user_state, dispatch: user_dispatch } = handleUser();

  useEffect(() => {

    name &&
      http().get(`${productsUrl}/search/${name}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));

    type &&
      http().get(`${productsUrl}/get/type/${type}`)
        .then(data => setProducts(data))
        .catch(error => console.error(error));

    if (user_state?.id) {
      (!name && !type) &&
        http().get(`${productsUrl}/get/favourites/${user_state.id}`)
          .then(data => setProducts(data))
          .catch(error => console.error(error));
    } else {
      navigate("/");
    }
  }, [type, name, allProducts]);


  const setTitle = title ? title : (type ? type.toLowerCase() : `${allProducts?.length} ${text.search.title} ${name}`);

  return (
    <>
      {
        allProducts ?
          (
            <div className={category}>
              <h3 className={`${category}__title`}>{setTitle}</h3>
              <div className={container}>
                {
                  allProducts.length > 0
                    ?
                    allProducts.map((product, index) => {
                      return <Product
                        key={index}
                        product={product}
                        isSearch={type ? false : true}
                        isLike={(!type && !name) ? true : false}
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