import React from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { useProduct } from '../../context/ProductContext';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

const ColorSelector = ({ setActivator }) => {

  const { text } = useLanguage();

  const { handleProduct } = useProduct();
  const { state, dispatch, PRODUCT_ACTIONS } = handleProduct();

  const handleColor = ({ target }, index) => {
    const { value } = target;
    dispatch({ type: PRODUCT_ACTIONS.SET_COLOR, payload: value });
    setActivator(index);
  }

  const isActive = (id) => (state.color == id) ? "active" : "";

  return (
    <div className="info__color">
      <p className="info__color--title">{text.view.color}</p>
      {
        state.colors.sort((a, b) => a.id > b.id ? 1 : -1).map(({ color, id }, index) => {
          const style = {
            color,
            backgroundColor: color
          }
          return (
            <input
              type="radio"
              key={uuid()}
              className={`${isActive(id)} info__color--colors`}
              style={style}
              onClick={(e) => handleColor(e, index)}
              value={id}
            />
          )
        })
      }
    </div>
  )
}

ColorSelector.propTypes = {
  setActivator: PropTypes.func.isRequired
}
export default ColorSelector