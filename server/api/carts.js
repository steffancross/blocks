const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Product, User, Cart, CartItems } = models;

//got to cart (find by UserId)

// const user = await User.findOne({
//   where: { id: userId },
//   include: {
//       model: Cart,
//       include: {
//           model: CartItems,
//           include: Product
//       }
//   }
// });

router.get('/:id/cart', async (req, res, next) => {
  try {
    const cartItems = await CartItems.findAll();
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// Add Item to Cart
router.post('/', async (req, res, next) => {
  try {
    const { userId, products } = req.body;

    // find cart associated with user
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    });

    // find products coming in
    for (const productData of products) {
      const { productId, quantity } = productData;

      const product = await Product.findOne({ where: { id: productId } });

      // create cart item
      await CartItems.create({
        quantity: quantity,
        cartId: cart.id,
        productId: product.id,
      });
    }

    res.send('cart updated');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
