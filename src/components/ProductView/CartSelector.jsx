import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

const CartSelector = ({ containerClass, innerRef, val, setVal }) => {

  const { vars: cartVars, extra } = useCart();
  const { totalProducts } = cartVars;
  const { findNumberProduct } = extra;

  const { vars: productVars } = useProduct();
  const { current: product, color, size, setIsEmptyConfig, setCurrentConfig } = productVars;

  const [tempStock, setTempStock] = useState(0);

  useEffect(() => {
    const getConfigurationStock = () => {
      const { configuration } = product;
      const configurationSelected = configuration.map((conf) => {
        if (conf.color.id == color && conf.sizes.size == size) return conf;
      });
      const selectedConfig = configurationSelected.filter(conf => conf)[0];
      setCurrentConfig(selectedConfig ? selectedConfig : null);
      return selectedConfig?.stock;
    };
    if (product) {
      const stock = getConfigurationStock();
      setIsEmptyConfig(stock ? false : true);
      setTempStock(stock ? stock : 0);
      setVal(0);
    }
  }, [color, size])


  const addCount = () => {
    if (val < tempStock)
      setVal(prevState => prevState + 1);
  }

  const removeCount = () => {
    if (val > 0)
      setVal(prevState => prevState - 1);
  }

  useEffect(() => {
    const total = findNumberProduct(product.id);
    setVal(total ? total : 0);
  }, [totalProducts])

  return (
    <div className={`${containerClass}__cart`}>
      <FontAwesomeIcon
        className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`}
        icon={faMinus}
        onClick={removeCount}
      />
      <input
        type="text"
        max={product.stock}
        min={0}
        className={`${containerClass}__cart--number ${product.stock === 0 && 'empty'}`}
        value={val}
        ref={innerRef}
        onChange={() => { }}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
      <FontAwesomeIcon
        className={`${containerClass}__cart--handle ${product.stock === 0 && 'empty'}`}
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