import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { useProduct } from '../../context/ProductContext';
import uuid from 'react-uuid';
import { setProductConfigurations } from '../../helpers/utils';

const ColorSelector = ({ product, setActivator }) => {

  const { text } = useLanguage();

  const { PRODUCT_ACTIONS, configureProduct } = useProduct();
  const { state: product_state, dispatch: product_dispatch } = configureProduct();

   const [colors, setColors] = useState([]); 

  const handleColor = ({ target }, index) => {
    const { value } = target;
    product_dispatch({ type: PRODUCT_ACTIONS.SET_COLOR, payload: { color: value } });
    setActivator(index);
  }

  useEffect(() => {
    const { colors: res, colorsIds: ids } = setProductConfigurations(product);
    const finalArray = [];
    [...res].forEach((c, index) => {
      finalArray.push({ color: c, id: [...ids][index] });
    });
    setColors(finalArray);

  }, [product])

  const isActive = (id) => (product_state.color == id) ? "active" : "";

  return (
    <div className="info__color">
      <p className="info__color--title">{text.view.color}</p>
      {
        colors &&
        colors.sort((a, b) => a.id > b.id ? 1 : -1).map(({ color, id }, index) => {
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

export default ColorSelector