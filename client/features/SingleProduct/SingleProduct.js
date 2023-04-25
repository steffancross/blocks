import React, { useEffect } from "react";
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
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch]);

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
      //check for existing products in localStorage with getItem, if so, push new product to an array and set it to LS
      // if not, create empty array, push product and set to LS

      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(singleProduct);
      localStorage.setItem("products", JSON.stringify(products));
    }
  };

  return (
    <div>
      <div>
        <img
          src={singleProduct.image}
          alt="just an image"
          style={{ width: "300px" }} //temporary in-line styling
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
