import React, { memo, useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import { setProductConfigurations } from '../../helpers/utils';
import { PropTypes } from 'prop-types';

const Images = memo(({ name, activator }) => {

  const { vars } = useProduct();
  const { current: product } = vars;
  const { colors: colorsProduct } = setProductConfigurations(product);
  const colors = [...colorsProduct];

  const [selectedSource, setSelectedSource] = useState(0);
  const [loaded, setLoaded] = useState(false);


  const handleImage = ({ target }) => {
    const { key } = target.dataset;
    changeImage(key);
  }

  const changeImage = (key) => {
    if (selectedSource !== key) {
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
                    src={require(`../../assets/images/${product.type}/${product.name}-${index}.png`)}
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