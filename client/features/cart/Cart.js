import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Cart = () => {
  //create empty products array
  const [products, setProducts] = useState([]);


  //filter out tokens from local storage and then setProducts to the parsed key/value from the local storage
  useEffect(() => {
    let localProducts = Object.entries(localStorage).filter(
      ([key]) => key !== "token"
    );

    setProducts(
      localProducts.map(([key, value]) => ({
        key,
        ...JSON.parse(value),
      }))
    );
  }, []);

  //need an async function here so that sends the products to the cart via post thunk?
  const completePurchase = () => {
    console.log(products);
  };

  //remove from cart by targeting product key which was added in the useEffect
  const removeFromCart = (product) => {
    localStorage.removeItem(product.key);
    location.reload();
  };

  return (
    //if logged in show cart which is pulling from state/db

    //non logged in component
    <div id="cart-main">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product" key={product.id}>
            <h3>Product: {product.name}</h3>
            <h3>{`$${product.price}`}</h3>
            <h3>Quantity: </h3>
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
