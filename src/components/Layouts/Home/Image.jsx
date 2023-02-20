import React, { useContext } from 'react';
import LanguageContext from '../../../context/LanguageContext';

const Image = () => {

  const { text } = useContext(LanguageContext);

  return (
    <div className='cover'>
      <div className='cover__text'>
        <div className='cover__text--title'>
          <p className='cover__text--title-1'>{text.home.cover.title1}</p>
          <p className='cover__text--title-2'>{text.home.cover.title2}</p>
          <p className='cover__text--title-3'>{text.home.cover.title3}</p>
        </div>
      </div>
    </div>
  )
}

export default Image;