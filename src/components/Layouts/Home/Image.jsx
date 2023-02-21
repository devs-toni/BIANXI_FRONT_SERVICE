import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
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


/*   useEffect(() => {
    getSlide();
  }, [position]) */

  const handleClick = (e) => {
    if (rightArrow.current.contains(e.target)) {
      if (position < 4) {
        setPosition(prevState => prevState + 1);
        carousel.current.style.transform = `translateX(${(position + 1) * -20}%)`;
      }
    } else {
      if (position > 0) {
        setPosition(prevState => prevState - 1);
        carousel.current.style.transform = `translateX(${(position - 1) * -20}%)`;
      }
    }
  }

/*   function getSlide() {
    setInterval(() => {
      if (position < 3) {
        setPosition(pos => pos + 1);
        carousel.current.style.transform = `translateX(${((position) + 1) * -25}%)`;
      } else {
        setPosition(0);
        carousel.current.style.transform = `translateX(0%)`;
      }
    }, 5000);
  } */

  return (
    <div className='carousel'>
      <div className='carousel__nav'>
        <FontAwesomeIcon icon={faChevronLeft} ref={leftArrow} onClick={handleClick} />
        <FontAwesomeIcon icon={faChevronRight} ref={rightArrow} onClick={handleClick} />
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