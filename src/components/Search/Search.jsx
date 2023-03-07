import { useSearchParams } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { SearchForm, SearchBox } from '../index';

const Search = () => {

  const { handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch, UI_ACTIONS } = handleUi();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () => {
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH });
    setSearchParams("");
  }
  
  return (
    <div className={`search ${ui_state.searchIsOpen ? "active" : ""}`}>
      <SearchForm
        innerRef={ui_state.searchRef}
        close={handleClose}
      />
      <SearchBox close={handleClose} />
    </div>
  )
}

export default Search;