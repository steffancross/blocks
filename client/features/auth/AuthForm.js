import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [tempAppear, setTempAppear] = useState(false);

  useEffect(() => {
    if (error) {
      setTempAppear(true);
      setTimeout(() => {
        setTempAppear(false);
      }, 1200);
    }
  }, [error]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const fullName = formName === "signup" ? evt.target.fullName.value : "";
    dispatch(authenticate({ email, password, fullName, method: formName }));
  };

  return (
    <div id="authform">
      <div id="authform-content">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <input name="email" type="text" placeholder="Email*" />
            <input name="password" type="password" placeholder="Password*" />
            {name === "signup" ? (
              <input name="fullName" type="text" placeholder="Name*" />
            ) : null}
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {tempAppear && <div id="error-login"> {error} </div>}
        </form>
        <div id="change-signup">
          <p style={{ marginRight: "5px" }}>Create a </p>
          <Link to="/signup" style={{ textDecoration: "underline" }}>
            new account here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
