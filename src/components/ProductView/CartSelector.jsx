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

  const { vars: productVars } = useProduct();
  const { current: product, color: selectedColor, size: selectedSize, setIsEmptyConfig, currentConfig, setCurrentConfig } = productVars;

  const [tempStock, setTempStock] = useState(0);

  useEffect(() => {
    const getConfigurationStock = () => {
      const allProductConfigurations = getCartProductConfigurations(totalProducts, product.id);
      const configMatch = getMatchConfiguration(allProductConfigurations, selectedSize, selectedColor);
      // If this product is already in cart the stock will be diferent
      if (configMatch) {
        setCurrentConfig(configMatch);
        return configMatch?.stock;
        // Else the product stock is the initial stock got in backend
      } else {
        const { configuration } = product;
        const configMatch = getMatchConfiguration(configuration, selectedSize, selectedColor);
        setCurrentConfig(configMatch ? configMatch : null);
        return configMatch?.stock;
      }
    };

    if (product) {
      const stock = getConfigurationStock();
      setIsEmptyConfig(stock ? false : true);
      setTempStock(stock ? stock : 0);
      setVal(0);
    }
  }, [selectedColor, selectedSize, totalProducts, product])


  const addCount = () => {
    if (val < tempStock)
      setVal(prevState => prevState + 1);
  }

  const removeCount = () => {
    if (val > 0)
      setVal(prevState => prevState - 1);
  }

  const emptyConfigurationStyles = (currentConfig?.stock === 0 || !currentConfig) ? 'empty' : '';

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
  setVal: PropTypes.func.isRequired
}
export default CartSelector;