import React from 'react'

const ViewImages = ({ img, name }) => {


  
  return (
    <div className="images">
      <div className="images__main">
        <img src={img} alt={name} className="images__main--img" />
        
      </div>
      <div className="images__secondary">
        <div className="images__secondary--images">
          <img src={img} alt={name} />
        </div>
      </div>
    </div>
  )
}

export default ViewImages