import React from "react";
import { useSelector } from "react-redux";

const Confirmation = () => {
  const confirmationNumber = Math.floor(Math.random() * 1000000);
  const fullName = useSelector((state) => state.auth.me.fullName);

  return (
    <>
      <div>
        <h2>Thanks for your purchase, {fullName}!</h2>
        <p>Your confirmation number is: {confirmationNumber}</p>
      </div>
    </>
  );
};

export default Confirmation;
