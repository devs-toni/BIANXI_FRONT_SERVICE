import React, { useContext, useEffect, useState } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import uuid from 'react-uuid';
import { setProductConfigurations } from '../../helpers/utils';

const SizeSelector = ({ product }) => {

  const { text } = useContext(LanguageContext);
  const { vars } = useProduct();
  const { size, setSize } = vars;

  const [sizes, setSizes] = useState([]);

  const handleSize = ({ target }) => {
    const { value } = target;
    setSize(value);
  }

  useEffect(() => {
    const { sizes: res } = setProductConfigurations(product);
    setSizes([...res]);
  }, [product])


  return (
    <div className="info__size">
      <p className="info__size--title">{text.view.size}</p>
      <select className="info__size--option" onChange={handleSize} value={size}>
        {
          sizes && sizes.sort((a, b) => a > b ? 1 : -1).map((size, index) => {
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