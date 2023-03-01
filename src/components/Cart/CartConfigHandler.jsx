import React, { useContext, useState, memo } from 'react'
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';
import Handler from './Handler';
import uuid from 'react-uuid';

const CartConfigHandler = memo(({ product }) => {

  const { text } = useContext(LanguageContext);

  const { funcs } = useCart();
  const { handleAddProduct, handleRemoveProduct } = funcs;

  const { config, id } = product;
  const [configs, setConfigs] = useState(config);

  const handleAdd = (idProduct, conf) => {
    const { id: idConf, stock, total } = conf;
    if (stock > 0)
      handleAddProduct(idProduct, idConf);
  }

  const handleRemove = (idProduct, conf) => {
    const { id: idConf, total } = conf;
    if (total > 0)
      handleRemoveProduct(idProduct, idConf);
  }

  return (
    <div className="footer-product">
      <div className='footer-product__all-handlers'>
        {
          configs
          &&
          configs.map(cnf => {
            return (
              <Handler
                key={uuid()}
                add={() => handleAdd(id, cnf)}
                remove={() => handleRemove(id, cnf)}
                product={product}
                conf={cnf}
              />)
          })
        }
      </div>
      <div className={`footer-product__remove`}>
        <FontAwesomeIcon
          icon={faTrash}
          className={`footer-product__remove--trash`}
        />
        <p className={`footer-product__remove--text`}>{text.cart.delete}</p>
      </div>
    </div>
  )
})

CartConfigHandler.propTypes = {
  product: PropTypes.object.isRequired,
}
export default CartConfigHandler;