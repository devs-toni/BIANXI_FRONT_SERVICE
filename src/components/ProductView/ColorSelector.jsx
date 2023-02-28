import React, { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import uuid from 'react-uuid';
import { useGlobal } from '../../context/GlobalContext';

const ColorSelector = () => {

  const { text } = useContext(LanguageContext);
  const { vars } = useProduct();
  const { color, setColor } = vars;

  const { colors } = useGlobal();
  const { colors: allColors } = colors;


  const handleColor = ({ target }) => {
    const { value } = target;
    setColor(value);
  }

  const isActive = (id) => (color == id) ? "active" : "";

  return (
    <div className="info__color">
      <p className="info__color--title">{text.view.color}</p>
      {
        allColors &&
        allColors.map(({ id, color }) => {
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