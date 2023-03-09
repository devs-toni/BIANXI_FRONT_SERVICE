import React from 'react'
import uuid from 'react-uuid';
import { PRODUCT_PROPERTIES } from '../../configuration';
import { useLanguage } from '../../context/GlobalContext';
import { useProduct } from '../../context/ProductContext';

const SizeSelector = () => {

  const { text } = useLanguage();

  const { productState, setProperty } = useProduct();

  const handleSize = ({ target }) => {
    const { value } = target;
    setProperty(PRODUCT_PROPERTIES.SIZE, value);
  }

  return (
    <div className="info__size">
      <p className="info__size--title">{text.view.size}</p>
      <select className="info__size--option" onChange={handleSize} value={productState.size}>
        {
          productState.sizes.sort((a, b) => a > b ? 1 : -1).map((size, index) => {
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