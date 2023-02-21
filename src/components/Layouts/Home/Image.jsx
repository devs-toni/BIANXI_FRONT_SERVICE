import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState, useEffect } from 'react';
import c0 from '../../../assets/images/carousel/carousel-0.jpg';
import c1 from '../../../assets/images/carousel/carousel-4.jpg';
import c2 from '../../../assets/images/carousel/carousel-1.jpg';
import c3 from '../../../assets/images/carousel/carousel-3.jpg';
import c4 from '../../../assets/images/carousel/carousel-2.jpg';

const Image = () => {
  const carousel = useRef(null);


  const rightArrow = useRef(null);
  const leftArrow = useRef(null);
  const [position, setPosition] = useState(0);
  const [manualPosition, setManualPosition] = useState(0);

  function handleCarousel() {
    if (position < 4) {
      setPosition(position + 1);
    } else {
      setPosition(0);
    }
  }

  function handleManualCarousel(e) {
    if (rightArrow.current.contains(e.target)) {
      if (manualPosition < 4) {
        setManualPosition(prevState => prevState + 1);
      }
    } else {
      if (manualPosition > 0) {
        setManualPosition(prevState => prevState - 1);
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => { handleCarousel() }, 5000);
    carousel.current.style.transform = `translateX(${(position) * -20}%)`;
    setManualPosition(position);
    return () => clearInterval(interval);
  }, [position]);

  useEffect(() => {
    carousel.current.style.transform = `translateX(${(manualPosition) * -20}%)`;
    setPosition(manualPosition);
  }, [manualPosition]);

  return (
    <div className='carousel'>
      <div className='carousel__nav'>
        <FontAwesomeIcon icon={faChevronLeft} ref={leftArrow} onClick={handleManualCarousel} />
        <FontAwesomeIcon icon={faChevronRight} ref={rightArrow} onClick={handleManualCarousel} />
      </div>
      <div className='carousel__images' ref={carousel}>
        <img src={c0} alt='Cover0' className='carousel__images--image' />
        <img src={c1} alt='Cover1' className='carousel__images--image' />
        <img src={c2} alt='Cover2' className='carousel__images--image' />
        <img src={c3} alt='Cover3' className='carousel__images--image' />
        <img src={c4} alt='Cover4' className='carousel__images--image' />
      </div>
    </div>
  )
}

export default Image;