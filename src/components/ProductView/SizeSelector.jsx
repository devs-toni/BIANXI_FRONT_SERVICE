import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid';
import { useLanguage } from '../../context/GlobalContext';
import { useProduct } from '../../context/ProductContext';

const SizeSelector = () => {

  const { text } = useLanguage();

  const { handleProduct } = useProduct();
  const { state, dispatch, PRODUCT_ACTIONS } = handleProduct();

  const handleSize = ({ target }) => {
    const { value } = target;
    dispatch({ type: PRODUCT_ACTIONS.SET_SIZE, payload: value })
  }

  return (
    <div className="info__size">
      <p className="info__size--title">{text.view.size}</p>
      <select className="info__size--option" onChange={handleSize} value={state.size}>
        {
          state.sizes.sort((a, b) => a > b ? 1 : -1).map((size, index) => {
            return (
              <React.Fragment key={uuid()}>
                {index === 0 && <option key={uuid()} value="">Choose option</option>}
                <option key={uuid()} value={size}>{size}</option>
              </React.Fragment>
            )
          })
        }
      </select>
    </div >
  )
}

export default SizeSelector