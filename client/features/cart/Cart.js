import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pulling the products in localStorage to render non-logged in users current products in cart
const products = Object.values(localStorage)
  .map((product) => {
    try {
      return JSON.parse(product);
    } catch (error) {
      console.error("Error parsing product from localStorage:", error);
      return null;
    }
  })
  .filter((product) => product !== null);

//remove from cart by targeting id key
const removeFromCart = (product) => {
  localStorage.removeItem();
  location.reload();
};

const Cart = () => {
  return (
    //if logged in show cart which is pulling from state/db

    //non logged in component
    <div id="cart-main">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product" key={product.id}>
            <h3>Product: {product.name}</h3>
            <button
              id="remove-from-cart"
              onClick={() => {
                removeFromCart(product);
              }}
            >
              Remove item from cart
            </button>
          </div>
        ))
      ) : (
        <div>You have no items in your cart</div>
      )}
    </div>
  );
};

export default Cart;
