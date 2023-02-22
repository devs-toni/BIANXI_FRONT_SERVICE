import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';



const Carousel = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(props.images[0]);
  const [loaded, setLoaded] = useState(false);

  const previous = () => {
    selectNewImage(selectedIndex, props.images, false);
  }

  const next = () => {
    selectNewImage(selectedIndex, props.images);
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
    if (props?.autoPlay || !props.showButtons) {
      const interval = setInterval(() => {
        console.log('autoPlay');
        selectNewImage(selectedIndex, props.images);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectNewImage])

  return (
    <div className='carousel'>
      {props.showButtons &&
        <div className="carousel__nav">
          <FontAwesomeIcon icon={faChevronLeft} onClick={previous} />
          <FontAwesomeIcon icon={faChevronRight} onClick={next} />
        </div>
      }
      <div className='carousel__images'>
        <img src={require(`../../../assets/images/carousel/${selectedImage}`)} alt='Cover' onLoad={() => setLoaded(true)} className={`carousel__images--image ${loaded ? 'loaded' : ''}`} />
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