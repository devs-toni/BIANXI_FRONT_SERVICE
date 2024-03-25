import { useSearchParams } from 'react-router-dom';
import { UI_ACTIONS, UI_SECTIONS } from '../../config/configuration';
import { useUI } from '../../context/UIContext';
import { SearchForm, SearchBox } from '../index';

const Search = () => {

  const { uiState, handleUi } = useUI();

  // eslint-disable-next-line 
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () => {
    handleUi(UI_SECTIONS.SEARCH, UI_ACTIONS.CLOSE);
    setSearchParams("");
  }

  return (
    <div className={`search ${uiState.searchIsOpen ? "active" : ""}`}>
      <SearchForm
        innerRef={uiState.searchRef}
        close={handleClose}
      />
      <SearchBox close={handleClose} />
    </div>
  )
}

export default Search;