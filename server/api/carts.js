const express = require("express");
const router = express.Router();
const { models } = require("../db");
const { Product, User, Cart, CartItems } = models;

router.get("/:id/cart", async (req, res, next) => {
  try {
    const cartItems = await CartItems.findAll();
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// Add Item to Cart
router.post("/", async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    // find cart associated with user
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    });

    const product = await Product.findOne({ where: { id: productId } });

    // create cart item
    await CartItems.create({
      quantity: 1,
      cartId: cart.id,
      productId: product.id,
    });

    res.send("cart updated");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
