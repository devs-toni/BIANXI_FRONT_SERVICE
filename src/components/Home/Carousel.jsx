import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({images, autoPlay, showButtons}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  }

  const next = () => {
    selectNewImage(selectedIndex, images);
  }

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? index < images.length - 1 : index > 0;
      const nextIndex = next ?
        (condition ? index + 1 : 0)
        : (condition ? index - 1 : images.length - 1);
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 1000)
  }

  useEffect(() => {
    if (autoPlay || !showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, 3000);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectNewImage])

  return (
    <div className='carousel'>
      {showButtons &&
        <div className="carousel__nav">
          <FontAwesomeIcon icon={faChevronLeft} onClick={previous} />
          <FontAwesomeIcon icon={faChevronRight} onClick={next} />
        </div>
      }
      <div className='carousel__images'>
        <img src={require(`../../assets/images/carousel/${selectedImage}`)} alt='Cover' onLoad={() => setLoaded(true)} className={`carousel__images--image ${loaded ? 'loaded' : ''}`} />
      </div>
    </div>
  )
}

Carousel.propTypes = {
  images: PropTypes.array,
  autoPlay: PropTypes.bool,
  showButtons: PropTypes.bool,
}

export default Carousel;