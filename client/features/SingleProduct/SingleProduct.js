import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./SingleProductSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const singleProduct = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch]);

  const addToLocal = (singleProduct) => {
    //check for existing products, if so, get them, if not, create array
    // let products = JSON.parse(localStorage.getItem("products")) || [];
    // products.push(singleProduct);
    let id = Math.floor(Math.random() * 100000);
    localStorage.setItem(id, JSON.stringify(singleProduct));
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
        <h3>{singleProduct.price}</h3>
        <h3>{singleProduct.description}</h3>
        <button
          id="addtolocal"
          onClick={() => {
            addToLocal(singleProduct);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
