import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn ? (
        <nav>
          <div>
            <h1 className="logo">BLOCKS</h1>
            <Link to="/products">Products</Link>
            <Link></Link>
          </div>
          <div>
            <Link to="/products" onClick={logoutAndRedirectHome}>
              Logout
            </Link>
            <Link to="/cart" className="cart-btn">
              Cart
            </Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <h1 className="logo">BLOCKS</h1>
            <Link to="/products">Products</Link>
            <Link></Link>
          </div>
          <div>
            <Link to="/login">Log In</Link>
            <Link to="/cart" className="cart-btn">
              Cart
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
