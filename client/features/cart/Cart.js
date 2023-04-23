import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync } from './CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartitems);
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    // checks if user exists before fetching, if didn't have this, on page refresh user hasn't loaded yet and it breaks
    if (user) {
      const userId = user.id;
      dispatch(fetchCartAsync({ userId }));
    }
  }, [dispatch, user]);

  return (
    <div id="cart-main">
      {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <div className="product" key={index}>
            <h3>Product: {item.product.name}</h3>
            <h3>{`$${item.product.price}`}</h3>
            <h3>Quantity: {item.quantity}</h3>
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
      <button
        id="complete-purchase"
        onClick={() => {
          completePurchase();
        }}
      >
        Complete your purchase
      </button>
    </div>
  );
};

export default Cart;
