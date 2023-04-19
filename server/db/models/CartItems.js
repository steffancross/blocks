const Sequelize = require("sequelize");
const db = require("../db");

const CartItems = db.define("cartitems", {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItems;
