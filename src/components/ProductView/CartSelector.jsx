import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import { getCartProductConfigurations, getMatchConfiguration } from '../../helpers/utils';
import { PRODUCT_PROPERTIES } from '../../config/configuration';

const CartSelector = ({ parentStyles, innerRef, value, setValue }) => {

  const { cartState } = useCart();

  const { productState, setProperty } = useProduct();
  const { id } = productState.product;
  const config = productState.config;
  const color = productState.color;
  const size = productState.size;

  const [tempStock, setTempStock] = useState(0);

  useEffect(() => {
    const getConfigurationStock = () => {
      const allProductConfigurations = getCartProductConfigurations(cartState.cartProducts, id);
      let finalConfig = getMatchConfiguration(allProductConfigurations, size, color);

      if (!finalConfig) {
        // If the product stock is the initial stock got in backend
        const { configuration } = productState.product;
        finalConfig = getMatchConfiguration(configuration, productState.size, productState.color);
      }
      setProperty(PRODUCT_PROPERTIES.CONFIG, finalConfig ? finalConfig : null)
      return finalConfig?.stock;
    }

    if (productState.product) {
      const stock = getConfigurationStock();
      setTempStock(stock ? stock : 0);
      setValue(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState.color, productState.size, cartState.cartProducts, productState.product])


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