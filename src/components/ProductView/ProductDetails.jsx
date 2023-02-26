import React, { useContext, useRef, useEffect } from 'react';
import LanguageContext from '../../context/LanguageContext';
import PropTypes from 'prop-types';
const ProductDetails = ({ description, features }) => {

  const { text } = useContext(LanguageContext);
  const descriptionRef = useRef();
  const featuresRef = useRef();


  const handleDescription = ({target}) => {
    target.classList.add("active");
    target.parentNode.lastChild.classList.remove("active");
    descriptionRef.current.classList.add("active");
    featuresRef.current.classList.remove("active");
  };

  const handleFeatures = ({target}) => {
    target.classList.add('active');
    target.parentNode.firstChild.classList.remove("active");
    descriptionRef.current.classList.remove("active");
    featuresRef.current.classList.add("active");
  };

  return (
    <div className="details">
      <div className="details__sections">
        <p className="details__sections--description active" onClick={handleDescription}>{text.view.detailInfo}</p>
        <p className="details__sections--features" onClick={handleFeatures}>{text.view.detailMore}</p>
      </div>
      <div className="details__info">
        <div className="details__info--text active" ref={descriptionRef}>
          <p className="details__info--text-warning">{text.view.warning}</p>
          <p className="details__info--text-description">{description}</p>
        </div>
        <div className="details__info--table" ref={featuresRef}>
          <table className='details__info--table-tab'>
            <tbody>
              {
                features?.map(({ feature, featureName }, index) => {
                  return (
                    <tr className='row' key={index}>
                      <th className='column-name'>{featureName}</th>
                      <td className='column-value'>
                        <span>
                          <p>{feature}</p>
                        </span>
                      </td>
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