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
  const [mainImage, setMainImage] = useState("");
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch]);

  useEffect(() => {
    if (
      singleProduct &&
      singleProduct.image &&
      singleProduct.image.length > 0
    ) {
      setMainImage(singleProduct.image[0]);
    }
  }, [singleProduct]);

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
  };

  const changeImage = (image) => {
    setMainImage(image);
  };

  return (
    <div>
      <div>
        <img
          src={mainImage}
          alt="just an image"
          style={{ width: "300px" }} //temporary in-line styling
        />
        <div id="image-line">
          {images &&
            images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  className="single-image"
                  onClick={() => changeImage(image)}
                ></img>
              );
            })}
        </div>
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
