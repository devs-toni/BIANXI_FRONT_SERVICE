import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRouter } from 'react-router-dom'

export const Link = ({ containerClass, text }) => {
  return (
    <div className={containerClass}>
      <LinkRouter className='item-link'>{text}</LinkRouter>
    </div>
  )
}

Link.propTypes = {
  containerClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}