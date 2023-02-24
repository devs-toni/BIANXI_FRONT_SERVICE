import React, { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext'

const ProductDetails = () => {
  const { text } = useContext(LanguageContext);

  return (
    <div className="details">
      <div className="details__sections">
        <p className="details__sections--description">{text.view.detailInfo}</p>
        <p className="details__sections--features">{text.view.detailMore}</p>
      </div>
      <div className="details__info">
        <div className="details__info--text">
          <p className="details__info--text-warning">{text.view.warning}</p>
          <p className="details__info--text-description"></p>
        </div>
      </div>
      <div className="details__info--list">
        <ul className='details__info--list-ul'>
          <li></li>
        </ul>
      </div>

    </div>
  )
}

export default ProductDetails