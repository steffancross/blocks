import React from "react";
import { useSelector } from "react-redux";

const Home = (props) => {
  const fullName = useSelector((state) => state.auth.me.fullName);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome, {fullName}</h1>
      <h2 className="home-subtitle">Check out our latest products</h2>
      <a href="/products" className="home-button">
        Shop now
      </a>
    </div>
  );
};

export default Home;
