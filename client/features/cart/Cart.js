import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // import Link component
import {
  fetchCartAsync,
  removeFromCartAsync,
  editQuantityAsync,
} from "./CartSlice";
import { countAndFilter } from "./functions";

const Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const cart = useSelector((state) => state.cart);
  const cartitems = useSelector((state) => state.cart.cartitems);
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  function update(array) {
    localStorage.setItem("products", JSON.stringify(array));
    const productsWithDuplicates = JSON.parse(localStorage.getItem("products"));
    const productsWithoutDuplicates = countAndFilter(productsWithDuplicates);
    setLocalProducts(productsWithoutDuplicates);
  }
  const [localProducts, setLocalProducts] = useState([]);

  if (isLoggedIn) {
    useEffect(() => {
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

    const editQuantity = (productId, plusOrMinus) => {
      dispatch(editQuantityAsync({ userId, productId, plusOrMinus }));
    };

    const completePurchase = () => {
      alert("Proceeding to Checkout!");
    };

    return (
      <div id="cart-main">
        {cartitems && cartitems.length > 0 ? (
          cartitems.map((cartitem, index) => (
            <div className="product" key={cartitem.productId}>
              <h3>Product: {cartitem.product.name}</h3>
              <img src={cartitem.product.image} alt={cartitem.product.name} />
              <h3>{`$${cartitem.product.price}`}</h3>
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
        {/* Replace the button with a Link */}
        {cartitems && cartitems.length > 0 && (
          <Link to="/checkout" onClick={completePurchase}>
            <button id="complete-purchase">Checkout</button>
          </Link>
        )}
      </div>
    );
  } else {
    //"not logged in" users cart

    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify([]));
    }

    useEffect(() => {
      const productsWithDuplicates = JSON.parse(
        localStorage.getItem("products")
      );

      const productsWithoutDuplicates = countAndFilter(productsWithDuplicates);
      setLocalProducts(productsWithoutDuplicates);
    }, []);

    const removeFromCart = (index) => {
      const updatedlocalProducts = localProducts.filter(
        (product, productTag) => index !== productTag
      );

      update(updatedlocalProducts);
    };

    const decreaseQuantity = (id) => {
      let products = JSON.parse(localStorage.getItem("products"));

      const indexToRemove = products.findIndex((product) => {
        return product.id === id;
      });

      const editedProducts = products.toSpliced(indexToRemove, 1);

      update(editedProducts);
    };

    const completePurchase = () => {
      alert("Proceeding to Checkout!");
    };

    return (
      <div id="cart-main">
        {localProducts && localProducts.length > 0 ? (
          localProducts.map((product, index) => (
            <div className="product" key={index}>
              <h3>Product: {product.name}</h3>
              <img src={product.image} alt={product.name} />
              <h3>{`$${product.price}`}</h3>
              <div className="edit-quantity">
                <button
                  id="reduce-quantity"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <h3>Quantity: {product.cartquantity}</h3>
                <button
                  id="increase-quantity"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
              <button
                id="remove-from-cart"
                onClick={() => {
                  removeFromCart(index);
                }}
              >
                Remove item from cart
              </button>
            </div>
          ))
        ) : (
          <div>You have no items in your cart</div>
        )}
        {/* Replace the button with a Link */}
        {localProducts && localProducts.length > 0 && (
          <Link to="/checkout" onClick={completePurchase}>
            <button id="complete-purchase">Checkout</button>
          </Link>
        )}
      </div>
    );
  }
};

export default Cart;
