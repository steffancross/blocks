const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./User');

const Cart = db.define('cart', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

const createAndAssignNewCartAfterCheckout = async (cart) => {
  if (cart.complete) {
    const cartWithUser = await Cart.findByPk(cart.id, { include: User });
    await cartWithUser.user.createCart();
  }
};

Cart.afterUpdate(createAndAssignNewCartAfterCheckout);

module.exports = Cart;
