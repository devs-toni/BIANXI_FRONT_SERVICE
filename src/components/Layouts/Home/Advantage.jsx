import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Advantage = ({ name, icon, description }) => {
  return (
    <div className='advantages__advantage'>
      <FontAwesomeIcon icon={icon} className='advantages__advantage--image' />
      <p className='advantages__advantage--name'>{name}</p>
      {description && <p className='advantages__advantage--description'>{description}</p>}
    </div>
  )
}

export default Advantage;