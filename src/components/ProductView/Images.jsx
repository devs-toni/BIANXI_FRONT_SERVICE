import React, { memo, useEffect, useState } from 'react';
import { setProductConfigurations } from '../../helpers/utils';
import { PropTypes } from 'prop-types';

const Images = memo(({ product, activator }) => {

  const { colors: colorsProduct } = setProductConfigurations(product);
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
            src={require(`../../assets/images/${product.type}/${product.name}-${selectedSource}.png`)}
            alt={product.name}
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
                    src={require(`../../assets/images/${product.type}/${product.name}-${selectedSource}.png`)}
                    className={`${selectedSource === index ? 'active' : ''}`}
                    alt={product.name}
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
  product: PropTypes.object.isRequired,
  activator: PropTypes.number.isRequired
}
export default Images;