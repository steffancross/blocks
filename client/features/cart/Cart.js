import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync, removeFromCartAsync } from './CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartitems = useSelector((state) => state.cart.cartitems);
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  useEffect(() => {
    // checks if user exists before fetching, if didn't have this, on page refresh user hasn't loaded yet and it breaks
    if (user) {
      dispatch(fetchCartAsync({ userId }));
    }
  }, [dispatch, user]);

  const removeFromCart = (productId) => {
    const cartId = cart.id;
    if (user) {
      dispatch(removeFromCartAsync({ cartId, productId, userId }));
    }
  };

  return (
    <div id="cart-main">
      {cartitems && cartitems.length > 0 ? (
        cartitems.map((cartitem, index) => (
          <div className="product" key={index}>
            <h3>Product: {cartitem.product.name}</h3>
            <h3>{`$${cartitem.product.price}`}</h3>
            <h3>Quantity: {cartitem.quantity}</h3>
            <button
              id="remove-from-cart"
              onClick={() => {
                removeFromCart(cartitem.productId);
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
