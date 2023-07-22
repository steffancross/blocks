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
        {cartitems && cartitems.length > 0 && (
          <div id="cart-categories">
            <p>Img</p>
            <p>Name</p>
            <p>Quantity</p>
            <p></p>
            <p>Price</p>
          </div>
        )}
        {cartitems && cartitems.length > 0 ? (
          cartitems.map((cartitem, index) => (
            <div className="product" key={cartitem.productId}>
              <img src={cartitem.product.image} alt={cartitem.product.name} />
              <h3>{cartitem.product.name}</h3>
              <div className="edit-quantity">
                <button
                  id="reduce-quantity"
                  onClick={() => editQuantity(cartitem.productId, -1)}
                >
                  -
                </button>
                <h3>{cartitem.quantity}</h3>
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
                REMOVE
              </button>
              <h3>{`$${cartitem.product.price}`}</h3>
            </div>
          ))
        ) : (
          <div>You have no items in your cart</div>
        )}
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

    const removeFromCart = (id) => {
      let products = JSON.parse(localStorage.getItem("products"));

      const updatedlocalProducts = products.filter(
        (product) => id !== product.id
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

    const increaseQuantity = (id) => {
      let products = JSON.parse(localStorage.getItem("products"));

      const indexToRemove = products.findIndex((product) => {
        return product.id === id;
      });
      const newItem = products[indexToRemove];

      const editedProducts = [...products, newItem];
      update(editedProducts);
    };

    const completePurchase = () => {
      alert("Please sign up or login to complete your checkout!");
    };

    return (
      <div id="cart-main">
        {localProducts && localProducts.length > 0 && (
          <div id="cart-categories">
            <p>Img</p>
            <p>Name</p>
            <p>Quantity</p>
            <p></p>
            <p>Price</p>
          </div>
        )}
        {localProducts && localProducts.length > 0 ? (
          localProducts.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <div className="edit-quantity">
                <button
                  id="reduce-quantity"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <h3>{product.cartquantity}</h3>
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
                  removeFromCart(product.id);
                }}
              >
                REMOVE
              </button>
              <h3>{`$${product.price}`}</h3>
            </div>
          ))
        ) : (
          <div>You have no items in your cart</div>
        )}

        {localProducts && localProducts.length > 0 && (
          <button
            onClick={() => {
              completePurchase();
            }}
            id="complete-purchase"
          >
            Checkout
          </button>
        )}
      </div>
    );
  }
};

export default Cart;
