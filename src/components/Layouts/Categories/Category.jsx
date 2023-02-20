import React from 'react'

const Category = ({ name, type }) => {
  return (
    <div className='category'>
      <h3 className="category__title">{name.toLowerCase()}</h3>
      
    </div>
  )
}

export default Category