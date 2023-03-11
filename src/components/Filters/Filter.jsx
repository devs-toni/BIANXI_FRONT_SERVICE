import React from 'react'
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/GlobalContext';

const Filter = () => {

  const { uiState } = useUI();
  const { text } = useLanguage();

  return (
    <div className={`${uiState.filterIsOpen ? 'active' : ''} category-filters`} >
      <div className={`${uiState.filterIsOpen ? 'active' : ''} filters-menu`}>
          <h1>{text.filters.btn}</h1>
      </div>
    </div>
  )
}

export default Filter;