import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCartAsync,
  removeFromCartAsync,
  editQuantityAsync,
} from "../cart/CartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartitems;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else setAddress(value);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate("/confirmation");
  };

  const removeFromCart = (productId) => {
    const cartId = cart.id;
    const userId = cart.userId;
    dispatch(removeFromCartAsync({ cartId, productId, userId }));
  };

  const editQuantity = (productId, plusOrMinus) => {
    const userId = cart.userId;
    dispatch(editQuantityAsync({ userId, productId, plusOrMinus }));
  };

  React.useEffect(() => {
    const userId = cart.userId;
    dispatch(fetchCartAsync({ userId }));
  }, [dispatch]);

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
      <div>
        <h2>Checkout</h2>
        <form onSubmit={handleCheckout}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <br />
          <h3>Order Summary</h3>
          <div className="all-products">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartitem) => (
                <div className="individual-product" key={cartitem.productId}>
                  <span>{cartitem.product.name}</span>
                  <img
                    src={cartitem.product.image}
                    alt={cartitem.product.name}
                  />
                  <span>
                    {cartitem.quantity} x $
                    {Number(cartitem.product.price).toFixed(2)}
                  </span>
                  <button
                    id="remove-from-cart"
                    onClick={() => removeFromCart(cartitem.productId)}
                  >
                    Remove item from cart
                  </button>
                  <div className="edit-quantity">
                    <button
                      id="reduce-quantity"
                      onClick={() => editQuantity(cartitem.productId, -1)}
                    >
                      -
                    </button>
                    <h3>Quantity: {cartitem.quantity}</h3>
                    <button
                      id="increase-quantity"
                      onClick={() => editQuantity(cartitem.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <br />
          <h4>Total: ${fetchCartTotal(cart).toFixed(2)}</h4>
          <button type="submit">Complete Purchase</button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
