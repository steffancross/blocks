import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
  addProductToCartAsync,
} from './SingleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const singleProduct = useSelector(selectSingleProduct);
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch]);

  const addToCart = (singleProduct) => {
    const userIdToSend = user.id;
    dispatch(
      addProductToCartAsync({
        userId: userIdToSend,
        productId: singleProduct.id,
      })
    );
  };

  return (
    <div>
      <div>
        <img
          src={singleProduct.image}
          alt="just an image"
          style={{ width: '300px' }} //temporary in-line styling
        />
        <h3>{singleProduct.name}</h3>
        <h3>{`$${singleProduct.price}`}</h3>
        <h3>{singleProduct.description}</h3>
        <button
          id="addtolocal"
          onClick={() => {
            addToCart(singleProduct);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
