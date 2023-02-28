import React, { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import uuid from 'react-uuid';
import { useGlobal } from '../../context/GlobalContext';

const SizeSelector = () => {

  const { text } = useContext(LanguageContext);
  const { vars } = useProduct();
  const { size, setSize } = vars;

  const { sizes } = useGlobal();
  const { sizes: allSizes } = sizes;

  const handleSize = ({ target }) => {
    const { value } = target;
    setSize(value);
  }

  return (
    <div className="info__size">
      <p className="info__size--title">{text.view.size}</p>
      <select className="info__size--option" onChange={handleSize} value={size}>
        {
          allSizes &&
          allSizes.map(({ size }) => {
            return (
              <option key={uuid()} value={size}>{size}</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default SizeSelector