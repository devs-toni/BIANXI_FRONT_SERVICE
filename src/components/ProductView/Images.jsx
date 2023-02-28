import React from 'react'
import { PropTypes } from 'prop-types';

const Images = ({ img, name }) => {

  const handleImage = (e) => {

  }

  return (
    <>
      <div className="images">
        <div className="images__main">
          <img src={img} alt={name} className="images__main--img" />
        </div>
        <div className="images__secondary">
          <div className="images__secondary--images">
            <img src={img} alt={name} onClick={handleImage} />
          </div>
        </div>
      </div>
    </>
  )
}

Images.propTypes = {

}
export default Images;