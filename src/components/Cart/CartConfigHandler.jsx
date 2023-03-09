import React, { memo } from 'react'
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';
import Handler from './Handler';
import uuid from 'react-uuid';

const CartConfigHandler = memo(({ product }) => {

  const { addOneProduct, deleteOneProduct, deleteConfiguration } = useCart();

  const { config: configurations, id } = product;

  const handleAdd = (idProduct, conf) => {
    const { id: idConf, stock } = conf;
    if (stock > 0)
      addOneProduct(idProduct, idConf)
  }

  const handleRemove = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    if (total > 1)
      deleteOneProduct(idProduct, idConf);
  }

  const handleRemoveConf = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    deleteConfiguration(idProduct, idConf, total);
  }

  return (
    <div className='all-handlers'>
      {
        configurations.map(cnf => {
          return (
            <Handler
              key={uuid()}
              add={() => handleAdd(id, cnf)}
              remove={() => handleRemove(id, cnf)}
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