import React, { useContext, useRef } from 'react';
import LanguageContext from '../../context/LanguageContext';
import PropTypes from 'prop-types';
const ProductDetails = ({ description, features }) => {

  const { text } = useContext(LanguageContext);
  const descriptionRef = useRef();
  const featuresRef = useRef();

  const handleDescription = () => {
    descriptionRef.current.style.display = "block";
    featuresRef.current.style.display = "none";
  };

  const handleFeatures = () => {
    descriptionRef.current.style.display = "none";
    featuresRef.current.style.display = "block";
  };

  return (
    <div className="details">
      <div className="details__sections">
        <p className="details__sections--description" onClick={handleDescription}>{text.view.detailInfo}</p>
        <p className="details__sections--features" onClick={handleFeatures}>{text.view.detailMore}</p>
      </div>
      <div className="details__info">
        <div className="details__info--text" ref={descriptionRef}>
          <p className="details__info--text-warning">{text.view.warning}</p>
          <p className="details__info--text-description">{description}</p>
        </div>
        <div className="details__info--list" ref={featuresRef}>
          <table className='details__info--list-ul'>
            <tbody>
              {
                features?.map(({ feature, featureName }, index) => {
                  return (
                    <tr key={index}>
                      <td>{featureName}</td>
                      <td>{feature}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

ProductDetails.propTypes = {
  description: PropTypes.string,
  features: PropTypes.array
}

export default ProductDetails;