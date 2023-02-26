import React, { useState, useEffect } from 'react'

const ViewImages = ({ img, name }) => {

  const [selectedImage, setSelectedImage] = useState();
  const [selectedName, setSelectedName] = useState();

  useEffect(() => {
    setSelectedImage(img);
    setSelectedName(name);
  }, [img])

  const handleImage = (e) => {

  }

  return (
    <>
      {
        selectedImage ?
          (
            <div className="images">
              <div className="images__main">
                {console.log(selectedImage)}
                <img src={selectedImage} alt={selectedName} className="images__main--img" />
              </div>
              <div className="images__secondary">
                <div className="images__secondary--images">
                  <img src={img} alt={name} className={`${selectedName === name ? "active" : ""}`} onClick={handleImage} />
                </div>
              </div>
            </div>
          )
          :
          (
            <p>Loading</p>
          )
      }
    </>
  )
}

export default ViewImages