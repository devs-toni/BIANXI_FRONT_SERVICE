import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import { Connection } from '../helpers/HTTP_Connection';
import { productsUrl } from '../config.js';
import uuid from 'react-uuid';

const Search = () => {

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const [tempResults, setTempResults] = useState([]);
  const inputSearch = useRef(null);

  const handleChange = ({ target }) => {
    const { value } = target;
    setInput(value)
    const { get } = Connection();
    if (input.length > 0) {
      get(`${productsUrl}/search/${input}`)
        .then(data => setTempResults(data))
        .catch(error => console.error(error));
    } else {
      setTempResults([]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product-category/bycicles/search/${input}`);
    setInput('');
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH });
  }

  useEffect(() => {
    setInput('');
    setTempResults([]);
    inputSearch.current.focus();
  }, [ui_state.searchIsOpen])

  return (
    <div className={`search ${ui_state.searchIsOpen ? "active" : ""}`}>
      <div className="search__container">
        <div className="search__container--glass">
          <FontAwesomeIcon onClick={handleSubmit} icon={faMagnifyingGlass} />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} ref={inputSearch} />
        </form>
        <div className='search__container--close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })} />
        </div>
      </div>
      <ul className='search__results'>
        {
          input.length > 0
          &&
          tempResults.map((res, ind) => {
            if (ind < 10) {
              return (
                <li key={uuid()} className="search__results--result" onClick={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH }) }}>
                  <Link to={`/product/options/${res.type}/${res.id}`}>{res.name}</Link>
                </li>
              )
            }
          })
        }
      </ul>
    </div>
  )
}

export default Search