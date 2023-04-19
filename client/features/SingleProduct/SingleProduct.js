import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from './SingleProductSlice'

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const singleProduct = useSelector(selectSingleProduct)

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id))
  }, [dispatch])

  return (
    <div>
      <div>
        <img src="{singleProduct.image}" alt="just an image" />
        <h3>{singleProduct.name}</h3>
        <h3>{singleProduct.price}</h3>
        <h3>{singleProduct.description}</h3>
      </div>
    </div>
  )
}

export default SingleProduct
