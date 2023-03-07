import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { NavLink } from 'react-router-dom';

const SearchBox = ({ input, results, reset }) => {

  return (
    <ul className='search__results'>
      {
        input.length > 0
        &&
        results.map((res, ind) => {
          if (ind < 10) {
            return (
              <li key={uuid()} className="search__results--result">
                <NavLink to={`/product/options/${res.type}/${res.id}`} onClick={reset}>{res.name}</NavLink>
              </li>
            )
          }
        })
      }
    </ul>
  )
}

SearchBox.propTypes = {
  input: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  reset: PropTypes.func.isRequired
}
export default SearchBox