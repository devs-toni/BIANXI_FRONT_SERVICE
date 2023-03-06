import React, { useReducer } from 'react'
import { useUI } from '../../context/UIContext';
import { SearchForm, SearchBox } from '../index';

const Search = () => {

  const { handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch, UI_ACTIONS } = handleUi();

  const SEARCH_ACTIONS = {
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    SET_TEMP_RESULTS: "SET_TEMP_RESULTS",
  }

  const initialState = {
    inputSearch: '',
    searchTempResults: [],
  }

  const searchReducer = (state, action) => {
    switch (action.type) {

      case SEARCH_ACTIONS.SET_SEARCH_VALUE:
        return { ...state, inputSearch: action.payload };

      case SEARCH_ACTIONS.SET_TEMP_RESULTS:
        return { ...state, searchTempResults: action.payload };

      default:
        break;
    }
  }
  const [state, dispatch] = useReducer(searchReducer, initialState);

  function handleSearch() {
    return { state, dispatch, SEARCH_ACTIONS };
  }

  const reset = () => {
    dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_VALUE, payload: '' });
    dispatch({ type: SEARCH_ACTIONS.SET_TEMP_RESULTS, payload: [] });
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })
  }

  return (
    <div className={`search ${ui_state.searchIsOpen ? "active" : ""}`}>
      <SearchForm
        reset={reset}
        handleSearch={handleSearch}
        innerRef={ui_state.searchRef}
      />
      <SearchBox
        input={state.inputSearch}
        results={state.searchTempResults}
        reset={reset}
      />
    </div>
  )
}

export default Search;