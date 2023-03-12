import React from 'react'
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { UI_ACTIONS, UI_SECTIONS } from '../../config/configuration';
import SliderPrice from '../Categories/SliderPrice';

const Filter = ({ products, setProducts }) => {

  const { uiState, handleUi } = useUI();
  const { text } = useLanguage();

  return (
    <div className={`${uiState.filterIsOpen ? 'active' : ''} category-filters`} >
      <div className={`${uiState.filterIsOpen ? 'active' : ''} filters-menu`}>
        <FontAwesomeIcon icon={faXmark} onClick={() => handleUi(UI_SECTIONS.FILTER, UI_ACTIONS.CLOSE)} className="filters-menu__close" />
        <div className="filters-menu__header">
          <h1>{text.filters.btn}</h1>
        </div>
        <div className="filters-menu__content">
          <p>Price:</p>
          <SliderPrice products={products} setProducts={setProducts} />
        </div>
      </div>
    </div>
  )
}

export default Filter;