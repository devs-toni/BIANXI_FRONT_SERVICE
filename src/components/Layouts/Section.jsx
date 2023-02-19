import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Section = ({ name, icon }) => {
  return (
    <div className='sections__section'>
      <FontAwesomeIcon className='sections__section--image' icon={icon} />
      <p className='sections__section--name'>{name.toLowerCase()}</p>
    </div>

  )
}

export default Section