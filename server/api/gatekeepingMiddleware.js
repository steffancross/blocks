const {
  models: { User },
} = require("../db");
//Will store all of our functions that will act as middleware between our reqeusts and response

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
};
