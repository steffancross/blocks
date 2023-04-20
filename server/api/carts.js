const express = require("express");
const router = express.Router();
const { models } = require("../db");
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

router.get("/:id/cart", async (req, res, next) => {
  try {
    const cartItems = await CartItems.findAll();
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const singleProduct = await Product.findByPk(req.params.id)
//     res.json(singleProduct)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router;
