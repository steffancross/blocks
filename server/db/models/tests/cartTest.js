const { models } = require('../index');
const { Cart } = models;

async function Test() {
  const cart = await Cart.findByPk(1);
  await cart.update({ complete: true });
}

Test();
