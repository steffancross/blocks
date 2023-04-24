const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Product, User, Cart, CartItems } = models;

// Gets cart info
router.get('/', async (req, res, next) => {
  try {
    // pulls userId
    const { userId } = req.query;

    // gets cart info, attributes make it only return the info we're interested in
    const cart = await Cart.findOne({
      where: {
        userId: userId,
      },
      include: {
        model: CartItems,
        attributes: ['id', 'quantity', 'productId'],
        include: {
          model: Product,
          attributes: ['name', 'price', 'image'],
        },
      },
    });

    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// Add item to Cart
router.post('/', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    // find cart associated with user
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    });

    // see if cartItem for that user/cart already exists
    let cartItem = await CartItems.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // find product
      const product = await Product.findOne({ where: { id: productId } });

      // create cart item
      await CartItems.create({
        quantity: 1,
        cartId: cart.id,
        productId: product.id,
      });
    }

    res.send('cart updated');
  } catch (err) {
    next(err);
  }
});

// Delete item from cart
router.delete('/', async (req, res, next) => {
  try {
    const { cartId, productId, userId } = req.query;

    // finds specific row
    const cartItem = await CartItems.findOne({
      where: { cartId: cartId, productId: productId },
    });
    await cartItem.destroy();

    // gets cart info, attributes make it only return the info we're interested in
    const newCart = await Cart.findOne({
      where: {
        userId: userId,
      },
      include: {
        model: CartItems,
        attributes: ['id', 'quantity', 'productId'],
        include: {
          model: Product,
          attributes: ['name', 'price', 'image'],
        },
      },
    });

    res.send(newCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
