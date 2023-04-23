import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { fetchCartTotal } from "../cart/CartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
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
            {cartItems.map((item) => (
              <div className="individual-product" key={item.id}>
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <br />
          {/* <h4>Total: ${fetchCartTotal(cartItems).toFixed(2)}</h4> */}
          <br />
          <button type="submit">Complete Order</button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
