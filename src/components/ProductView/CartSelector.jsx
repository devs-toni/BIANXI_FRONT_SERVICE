import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import { getCartProductConfigurations, getMatchConfiguration } from '../../helpers/utils';

const CartSelector = ({ containerClass, innerRef, val, setVal }) => {

  const { vars: cartVars } = useCart();
  const { totalProducts } = cartVars;

  const { PRODUCT_ACTIONS, configureProduct } = useProduct();
  const { state: product_state, dispatch: product_dispatch } = configureProduct();

  const [tempStock, setTempStock] = useState(0);

  useEffect(() => {
    const getConfigurationStock = () => {
      const allProductConfigurations = getCartProductConfigurations(totalProducts, product_state.product.id);
      const configMatch = getMatchConfiguration(allProductConfigurations, product_state.size, product_state.color);
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
      setVal(0);
    }
  }, [product_state.color, product_state.size, totalProducts, product_state.product])


  const addCount = () => {
    if (val < tempStock)
      setVal(prevState => prevState + 1);
  }

  const removeCount = () => {
    if (val > 0)
      setVal(prevState => prevState - 1);
  }

  const emptyConfigurationStyles = (product_state.config?.stock === 0 || !product_state.config) ? 'empty' : '';

  return (
    <div className={`${containerClass}__cart`}>
      <FontAwesomeIcon
        className={`${containerClass}__cart--handle ${emptyConfigurationStyles}`}
        icon={faMinus}
        onClick={removeCount}
      />
      <input
        type="text"
        className={`${containerClass}__cart--number ${emptyConfigurationStyles}`}
        value={val}
        ref={innerRef}
        onChange={() => { }}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
      <FontAwesomeIcon
        className={`${containerClass}__cart--handle ${emptyConfigurationStyles}`}
        icon={faPlus}
        onClick={addCount}
      />
    </div>
  )
}

CartSelector.propTypes = {
  containerClass: PropTypes.string.isRequired,
  innerRef: PropTypes.object.isRequired,
  setVal: PropTypes.func.isRequired,
}
export default CartSelector;