import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div>
      {isLoggedIn ? (
        <nav>
          <div>
            <h1 className="logo">BLOCKS</h1>
            <Link to="/products">Products</Link>
          </div>
          <div>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/cart">Cart</Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <h1 className="logo">BLOCKS</h1>
            <Link to="/products">Products</Link>
          </div>
          <div>
            <Link to="/login">Log In</Link>
            <Link to="/cart" id="cart-btn">
              Cart
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
