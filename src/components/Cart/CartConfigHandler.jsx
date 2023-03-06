import React, { memo } from 'react'
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';
import Handler from './Handler';
import uuid from 'react-uuid';

const CartConfigHandler = memo(({ product }) => {


  const { handleCart } = useCart();
  const { dispatch: cart_dispatch, CART_ACTIONS } = handleCart();

  const { config: configurations, id } = product;

  const handleAdd = (idProduct, conf) => {
    const { id: idConf, stock } = conf;
    if (stock > 0)
      cart_dispatch({
        type: CART_ACTIONS.ADD_ONE_PRODUCT, payload: {
          productAdd: idProduct,
          configurationAdd: idConf
        }
      })
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