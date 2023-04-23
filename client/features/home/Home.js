import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const fullName = useSelector((state) => state.auth.me.fullName);

  return (
    <div>
      <h3>Welcome, {fullName}</h3>
    </div>
  );
};

export default Home;
