import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useUI } from '../context/UIContext';

const Search = () => {

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const [input, setInput] = useState('')

  const handleChange = ({ target }) => {
    const { value } = target;
    setInput(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={`search ${ui_state.searchIsOpen ? "active" : ""}`}>
      <div className="search__container">
        <div className="search__container--glass">
          <FontAwesomeIcon onClick={handleSubmit} icon={faMagnifyingGlass} />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
        </form>
        <div className='search__container--close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })} />
        </div>
      </div>
    </div>
  )
}

export default Search