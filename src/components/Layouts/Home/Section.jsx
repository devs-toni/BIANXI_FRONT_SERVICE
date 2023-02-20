import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Section = ({ name, icon, path }) => {
  return (
    <div className='sections__section'>
      <Link className='sections__section--link' to={`product-category/bycicles/${path}`}>
        <FontAwesomeIcon className='sections__section--image' icon={icon} />
        <p className='sections__section--name'>{name.toLowerCase()}</p>
      </Link>
    </div>
  )
}

export default Section;