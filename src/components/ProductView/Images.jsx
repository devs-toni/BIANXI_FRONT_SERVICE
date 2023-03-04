import React, { memo, useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import { setProductConfigurations } from '../../helpers/utils';
import { PropTypes } from 'prop-types';

const Images = memo(({ name, activator }) => {


  const { configureProduct } = useProduct();
  const { state: product_state } = configureProduct();

  const { colors: colorsProduct } = setProductConfigurations(product_state.product);

  const colors = [...colorsProduct];

  const [selectedSource, setSelectedSource] = useState(0);
  const [loaded, setLoaded] = useState(false);


  const handleImage = ({ target }) => {
    const { key } = target.dataset;
    changeImage(key);
  }

  const changeImage = (key) => {
    if (selectedSource !== parseInt(key)) {
      setLoaded(false);
      setTimeout(() => {
        setSelectedSource(parseInt(key));
      }, 300)
    }
  }

  useEffect(() => {
    changeImage(activator);
  }, [activator])


  return (
    <>
      <div className="images">
        <div className="images__main">
          <img
            src={require(`../../assets/images/${product_state.product.type}/${product_state.product.name}-${selectedSource}.png`)}
            alt={name}
            onLoad={() => setLoaded(true)}
            className={`images__main--img ${loaded ? 'loaded' : ''}`}
          />
        </div>
        <div className="images__secondary">
          <div className="images__secondary--images">
            {
              colors
              &&
              colors.map((color, index) => {
                return (
                  <img
                    key={index}
                    data-key={index}
                    src={require(`../../assets/images/${product_state.product.type}/${product_state.product.name}-${index}.png`)}
                    className={`${selectedSource === index ? 'active' : ''}`}
                    alt={name}
                    onClick={handleImage}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
});

Images.propTypes = {

}
export default Images;