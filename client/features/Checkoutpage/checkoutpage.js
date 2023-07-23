import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCartAsync,
  removeFromCartAsync,
  editQuantityAsync,
} from "./checkoutslice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartitems);
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync({ userId: user.id }));
    }
  }, [dispatch, user]);

  const removeFromCart = (productId) => {
    const cartId = cart.id;
    if (user) {
      dispatch(removeFromCartAsync({ cartId, productId, userId }));
    }
  };

  const editQuantity = (productId, plusOrMinus) => {
    const userId = cart.userId;
    dispatch(editQuantityAsync({ userId, productId, plusOrMinus }));
  };

  const fetchCartTotal = (cart) => {
    let total = 0;
    if (cart && cart.cartitems) {
      cart.cartitems.forEach((cartItem) => {
        total += cartItem.product.price * cartItem.quantity;
      });
    }
    return total;
  };

  return (
    <>
      <div id="checkout-main">
        <h2>Checkout</h2>
        <form onSubmit={() => {}}>
          <h3>Order Summary</h3>
          <div id="checkout-all">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartitem, index) => (
                <div id="checkout-single" key={index}>
                  <p>{cartitem.product.name}</p>
                  <p>
                    {cartitem.quantity} x $
                    {Number(cartitem.product.price).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <br />
          <h4>Total: ${fetchCartTotal(cart).toFixed(2)}</h4>
          <Link to="/confirmation">
            <button type="button" id="complete-checkout">
              Complete Checkout
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Checkout;
