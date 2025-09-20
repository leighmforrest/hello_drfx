import React from 'react'

const ImageCap = ({imgUrl, alt}) => {
  return (
    <img src={imgUrl} alt={alt} className="w-full object-cover aspect-square" />
  )
}

export default ImageCap