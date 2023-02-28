import React, { useContext, useEffect, useState } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { colorsUrl } from '../../config';
import { get } from '../../helpers/rest.js';
import uuid from 'react-uuid';

const ColorSelector = () => {

  const { text } = useContext(LanguageContext);
  const { vars } = useProduct();
  const { color, setColor } = vars;
  const [currentColors, setCurrentColors] = useState(null);

  useEffect(() => {
    get(setCurrentColors, `${colorsUrl}/get/all`);
  }, []);

  const handleColor = ({ target }) => {
    const { value } = target;
    setColor(value);
  }

  const isActive = (id) => (color == id) ? "active" : "";

  return (
    <div className="info__color">
      <p className="info__color--title">{text.view.color}</p>
      {
        currentColors &&
        currentColors.map(({ id, color }) => {
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
              onClick={handleColor}
              value={id}
            />
          )
        })
      }
    </div>
  )
}

export default ColorSelector