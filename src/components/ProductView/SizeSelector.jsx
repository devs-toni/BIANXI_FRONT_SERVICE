import React, { useEffect, useState } from 'react'
import { useProduct } from '../../context/ProductContext';
import uuid from 'react-uuid';
import { setProductConfigurations } from '../../helpers/utils';
import { useLanguage } from '../../context/GlobalContext';

const SizeSelector = ({ product }) => {

  const { text } = useLanguage();

  const { PRODUCT_ACTIONS, configureProduct } = useProduct();
  const { state: product_state, dispatch: product_dispatch } = configureProduct();

  const [sizes, setSizes] = useState([]);

  const handleSize = ({ target }) => {
    const { value } = target;
    product_dispatch({ type: PRODUCT_ACTIONS.SET_SIZE, payload: value });
  }

  useEffect(() => {
    const { sizes: res } = setProductConfigurations(product);
    setSizes([...res]);
  }, [product])


  return (
    <div className="info__size">
      <p className="info__size--title">{text.view.size}</p>
      <select className="info__size--option" onChange={handleSize} value={product_state.size}>
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