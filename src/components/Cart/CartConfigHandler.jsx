import React, { useState, memo } from 'react'
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';
import Handler from './Handler';
import uuid from 'react-uuid';

const CartConfigHandler = memo(({ product }) => {


  const { handleCart } = useCart();
  const { dispatch: cart_dispatch, CART_ACTIONS, storage } = handleCart();

  const { config, id } = product;
  const [configs, setConfigs] = useState(config);

  const handleAdd = (idProduct, conf) => {
    const { id: idConf, stock } = conf;
    if (stock > 0)
      cart_dispatch({
        type: CART_ACTIONS.ADD_ONE_PRODUCT, payload: {
          productAdd: idProduct,
          configurationAdd: idConf
        }
      })
    storage();
  }

  const handleRemove = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    if (total > 1)
      cart_dispatch({
        type: CART_ACTIONS.DELETE_ONE_PRODUCT, payload: {
          productDel: idProduct,
          configurationDel: idConf
        }
      })
    storage();
  }

  const handleRemoveConf = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    cart_dispatch({
      type: CART_ACTIONS.DELETE_CONFIGURATION, payload: {
        idProduct,
        idConf,
        totalProductInConf: total
      }
    })
    storage();
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