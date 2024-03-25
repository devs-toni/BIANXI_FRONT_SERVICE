import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { PRODUCT_LINK } from '../../router/paths';

const SearchBox = ({ close }) => {

  const { allProducts } = useGlobal();
  const { products } = allProducts;

  // eslint-disable-next-line 
  const [searchParams,setSearchParams] = useSearchParams();
  const q = searchParams.get('q');


  return (
    <ul className='search__results'>
      {
        products &&
        products?.filter(({ name }) => {
            if (!q) return false;
            else {
              if (name.toLowerCase().includes(q.toLowerCase())) {
                return true;
              } else return false;
            }
          })
          // eslint-disable-next-line array-callback-return
          .map((res, ind) => {
            if (ind < 10) {
              return (
                <li key={uuid()} className="search__results--result">
                  <NavLink to={`${PRODUCT_LINK}/${res.type}/${res.id}`} onClick={close}>{res.name}</NavLink>
                </li>
              )
            }
          })
      }
    </ul>
  )
}

SearchBox.propTypes = {
  // input: PropTypes.string.isRequired,
  // results: PropTypes.array.isRequired,
   close: PropTypes.func.isRequired
}
export default SearchBox