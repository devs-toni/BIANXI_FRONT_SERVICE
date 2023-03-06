import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { productsUrl } from '../../config';
import { Connection } from '../../helpers/HTTP_Connection';
import PropTypes from 'prop-types';

const SearchForm = ({ reset, handleSearch, innerRef }) => {

  const { state, dispatch, SEARCH_ACTIONS } = handleSearch();

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value } = target;
    dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_VALUE, payload: value })
    const { get } = Connection();
    if (state.inputSearch.length > 0) {
      get(`${productsUrl}/search/${state.inputSearch}`)
        .then(data => {
          dispatch({ type: SEARCH_ACTIONS.SET_TEMP_RESULTS, payload: data })
        })
        .catch(error => console.error(error));
    } else {
      dispatch({ type: SEARCH_ACTIONS.SET_TEMP_RESULTS, payload: [] });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product-category/bycicles/search/${state.inputSearch}`);
    reset();
  }

  return (
    <div className="search__container">
      <div className="search__container--glass">
        <FontAwesomeIcon onClick={handleSubmit} icon={faMagnifyingGlass} />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={state.inputSearch} onChange={handleChange} ref={innerRef} />
      </form>
      <div className='search__container--close'>
        <FontAwesomeIcon icon={faXmark} onClick={reset} />
      </div>
    </div>
  )
}

SearchForm.propTypes = {
  reset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired
}

export default SearchForm