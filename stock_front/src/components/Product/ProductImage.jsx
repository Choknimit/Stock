import React from 'react'

function ProductImage(props) {
  return (
    <div className='w-full flex justify-center'>
        <img className='h-14 w-1/3 object-cover border' src={props.prdphoto} alt="" />
    </div>
  )
}

export default ProductImage