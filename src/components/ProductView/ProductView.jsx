import React from 'react'
import { useParams } from 'react-router-dom'

const ProductView = () => {

  const id = useParams();

  console.log(id)
  return (
    <div>ProductView</div>
  )
}

export default ProductView