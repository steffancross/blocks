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
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="nav"></div>
      <h1 className="logo">
        Nobody beats the <span>biz</span>
      </h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">My Cart</Link>
            {/* Added link to All Products */}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar">
            <Link to="/Home">home</Link>
            <Link to="/login">login</Link>
            <Link to="/cart">my cart</Link>
            <Link to="/products">all products</Link>
            <Link to="/signup">sign up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
