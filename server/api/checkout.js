const express = require("express");
const router = express.Router();
const { models } = require("../db");
const { Product, User, Cart, CartItems } = models;


router.put("/submit", async (req, res, next) => {
  const { confirmationNumber } = req.body;
  const { userId } = req.body;
  try {
    const newConfirmation = await models.Confirmation.create({
      confirmationNumber,
    });
    res.status(201).send(newConfirmation);
  } catch (err) {
    next(err);
  }
});

// Gets cart info
router.get("/", async (req, res, next) => {
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
        attributes: ["id", "quantity", "productId"],
        include: {
          model: Product,
          attributes: ["name", "price", "image"],
        },
      },
    });

    // Sort the cartitems by productId in ascending order
    cart.cartitems.sort((a, b) => a.productId - b.productId);

    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// Add item to Cart
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

    res.send("cart updated");
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { cartId, productId, userId } = req.query;

    // finds specific row and deletes item
    const cartItem = await CartItems.findOne({
      where: { cartId: cartId, productId: productId },
    });
    await cartItem.destroy();

    // refetch updated cart
    const newCart = await Cart.findOne({
      where: {
        userId: userId,
      },
      include: {
        model: CartItems,
        attributes: ["id", "quantity", "productId"],
        include: {
          model: Product,
          attributes: ["name", "price", "image"],
        },
      },
    });

    // Sort the cartitems by productId in ascending order
    newCart.cartitems.sort((a, b) => a.productId - b.productId);

    res.send(newCart);
  } catch (err) {
    next(err);
  }
});

// Edit quantity in cart
router.put("/", async (req, res, next) => {
  try {
    const { userId, productId, plusOrMinus } = req.body;

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

    // check to increase or decrease quantity
    if (plusOrMinus > 0) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else if (plusOrMinus < 0 && cartItem.quantity >= 2) {
      cartItem.quantity -= 1;
      await cartItem.save();
    }

    // refetch updated cart
    const newCart = await Cart.findOne({
      where: {
        userId: userId,
      },
      include: {
        model: CartItems,
        attributes: ["id", "quantity", "productId"],
        include: {
          model: Product,
          attributes: ["name", "price", "image"],
        },
      },
    });

    // Sort the cartitems by productId in ascending order
    newCart.cartitems.sort((a, b) => a.productId - b.productId);

    res.send(newCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;