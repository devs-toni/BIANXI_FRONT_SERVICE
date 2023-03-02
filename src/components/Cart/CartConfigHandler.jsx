import React, { useState, memo } from 'react'
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';
import Handler from './Handler';
import uuid from 'react-uuid';

const CartConfigHandler = memo(({ product }) => {


  const { funcs } = useCart();
  const { handleAddProduct, handleRemoveProduct, handleRemoveConfig } = funcs;

  const { config, id } = product;
  const [configs, setConfigs] = useState(config);

  const handleAdd = (idProduct, conf) => {
    const { id: idConf, stock } = conf;
    if (stock > 0)
      handleAddProduct(idProduct, idConf);
  }

  const handleRemove = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    if (total > 1)
      handleRemoveProduct(idProduct, idConf);
  }

  const handleRemoveConf = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    handleRemoveConfig(idProduct, idConf, total);
  }

  return (
    <div className='all-handlers'>
      {
        configs.map(cnf => {
          return (
            <Handler
              key={uuid()}
              add={() => handleAdd(id, cnf)}
              remove={() => handleRemove(id, cnf)}
              product={product}
              conf={cnf}
              removeConfig={() => handleRemoveConf(id, cnf)}
            />)
        })
      }
    </div>

  )
})

CartConfigHandler.propTypes = {
  product: PropTypes.object.isRequired,
}
export default CartConfigHandler;