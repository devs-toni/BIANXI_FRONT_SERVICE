import React, { useContext, useEffect, useState } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { sizesUrl } from '../../config';
import { get } from '../../helpers/rest.js';
import uuid from 'react-uuid';

const SizeSelector = () => {

  const { text } = useContext(LanguageContext);
  const { vars } = useProduct();
  const { size, setSize } = vars;
  const [currentSizes, setCurrentSizes] = useState();

  const handleSize = ({ target }) => {
    const { value } = target;
    setSize(value);
  }

  useEffect(() => {
    get(setCurrentSizes, `${sizesUrl}/get/all`);
  }, []);

  return (
    <div className="info__size">
      <p className="info__size--title">{text.view.size}</p>
      <select className="info__size--option" onChange={handleSize} value={size}>
        {
          currentSizes &&
          currentSizes.map(({ size }) => {
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