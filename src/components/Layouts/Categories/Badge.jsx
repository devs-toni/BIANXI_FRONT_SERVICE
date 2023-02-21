import React from 'react'

const Badge = ({ text, classAttribute }) => {
  return (
    <div className={classAttribute}>
      <p>{text}</p>
    </div>
  )
}

export default Badge;