import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pulling the products in localStorage to render non-logged in users current products in cart
let products = JSON.parse(localStorage.getItem("products"));

const Cart = () => {
  return (
    <div id="cart-main">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <h3>Product: {product.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Cart;
