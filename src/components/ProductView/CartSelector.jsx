import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import { getCartProductConfigurations, getMatchConfiguration } from '../../helpers/utils';

const CartSelector = ({ parentStyles, innerRef, value, setValue }) => {

  const { vars: cartVars } = useCart();
  const { totalProducts } = cartVars;

  const { handleProduct } = useProduct();
  const { state: product_state, dispatch: product_dispatch, PRODUCT_ACTIONS } = handleProduct();
  const { id } = product_state.product;
  const config = product_state.config;
  const color = product_state.color;
  const size = product_state.size;

  const [tempStock, setTempStock] = useState(0);

  useEffect(() => {
    const getConfigurationStock = () => {
      const allProductConfigurations = getCartProductConfigurations(totalProducts, id);
      const configMatch = getMatchConfiguration(allProductConfigurations, size, color);
      // If this product is already in cart the stock will be diferent
      if (configMatch) {
        product_dispatch({ type: PRODUCT_ACTIONS.SET_CONFIG, payload: configMatch ? configMatch : null });
        return configMatch?.stock;
        // Else the product stock is the initial stock got in backend
      } else {
        const { configuration } = product_state.product;
        const configMatch = getMatchConfiguration(configuration, product_state.size, product_state.color);
        product_dispatch({ type: PRODUCT_ACTIONS.SET_CONFIG, payload: configMatch ? configMatch : null });
        return configMatch?.stock;
      }
    };

    if (product_state.product) {
      const stock = getConfigurationStock();
      setTempStock(stock ? stock : 0);
      setValue(0);
    }
  }, [product_state.color, product_state.size, totalProducts, product_state.product])


  const addCount = () => {
    if (value < tempStock)
      setValue(prevState => prevState + 1);
  }

  const removeCount = () => {
    if (value > 0)
      setValue(prevState => prevState - 1);
  }

  const emptyConfigurationStyles = (config?.stock === 0 || !config) ? 'empty' : '';

  return (
    <div className={`${parentStyles}__cart`}>
      <FontAwesomeIcon
        className={`${parentStyles}__cart--handle ${emptyConfigurationStyles}`}
        icon={faMinus}
        onClick={removeCount}
      />
      <input
        type="text"
        className={`${parentStyles}__cart--number ${emptyConfigurationStyles}`}
        value={value}
        ref={innerRef}
        onChange={() => { }}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
      <FontAwesomeIcon
        className={`${parentStyles}__cart--handle ${emptyConfigurationStyles}`}
        icon={faPlus}
        onClick={addCount}
      />
    </div>
  )
}

CartSelector.propTypes = {
  parentStyles: PropTypes.string.isRequired,
  innerRef: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
}
export default CartSelector;