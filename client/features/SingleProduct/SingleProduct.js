import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
  addProductToCartAsync,
} from "./SingleProductSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const singleProduct = useSelector(selectSingleProduct);
  const images = singleProduct.image;
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [tempAppear, setTempAppear] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch, id]);

  const addToCart = (singleProduct) => {
    if (isLoggedIn) {
      const userIdToSend = user.id;
      dispatch(
        addProductToCartAsync({
          userId: userIdToSend,
          productId: singleProduct.id,
        })
      );
    } else {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(singleProduct);
      localStorage.setItem("products", JSON.stringify(products));
    }

    setTempAppear(true);
    setTimeout(() => {
      setTempAppear(false);
    }, 1500);
  };

  return (
    <div id="product-page">
      <div id="product-info">
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
        {tempAppear && <div id="added-to-cart">Added To Cart</div>}
      </div>
      <div id="image-line">
        {images &&
          images.map((image, index) => {
            return <img key={index} src={image} className="single-image"></img>;
          })}
      </div>
    </div>
  );
};

export default SingleProduct;
