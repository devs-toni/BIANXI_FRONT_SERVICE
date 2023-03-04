import React, { useState } from 'react';
import { useLanguage } from '../../context/GlobalContext';
import PropTypes from 'prop-types';

const Details = ({ description, features }) => {

  const { text } = useLanguage();

  const [sectionActive, setSectionActive] = useState("description");
  const isActive = (target) => sectionActive === target ? 'active' : '';

  return (
    <div className="details">
      <div className="details__sections">
        <p className={`details__sections--description ${isActive("description")}`} onClick={() => setSectionActive("description")}>{text.view.detailInfo}</p>
        <p className={`details__sections--features ${isActive("features")}`} onClick={() => setSectionActive("features")}>{text.view.detailMore}</p>
      </div>
      <div className="details__info">
        <div className={`details__info--text ${isActive("description")}`}>
          <p className="details__info--text-warning">{text.view.warning}</p>
          <p className="details__info--text-description">{description}</p>
        </div>
        <div className={`details__info--table ${isActive("features")}`}>
          <table className='details__info--table-tab'>
            <tbody>
              {
                features.map(({ feature, featureName }, index) => {
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

Details.propTypes = {
  description: PropTypes.string.isRequired,
  features: PropTypes.array.isRequired
}

export default Details;