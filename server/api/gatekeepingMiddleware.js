const {
  models: { User },
} = require("../db");

//This function will act as middleware to check if the request contains a valid token in the header.
//If the token is valid, the function will attach the user information to the request and call the next middleware function.
//If the token is not valid, it will call the next middleware function with an error.
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

// This middleware function checks if the user making the request is an admin or not
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .send(
        "Access Denied: No admin privileges for you! Time to go back to your regular user life."
      );
  }
  next();
};

module.exports = {
  requireToken,
  isAdmin,
};
