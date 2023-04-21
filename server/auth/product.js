// const router = require("express").Router();
// const {
//   models: { Product },
// } = require("../db");
// module.exports = router;

// router.post("/products", async (req, res, next) => {
//   try {
//     const { name, price } = req.body;
//     const newProduct = await Product.create({ name, price });
//     res.json(newProduct);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/signup", async (req, res, next) => {
//   try {
//Clients are prevented from making themselves admin
//     const { name, email, password } = req.body;
//     const user = await Product.create({ name, email, password });

//     res.send({ token: await product.generateToken() });
//   } catch (err) {
//     if (err.name === "SequelizeUniqueConstraintError") {
//       res.status(401).send("User already exists");
//     } else {
//       next(err);
//     }
//   }
// });

// router.get("/me", async (req, res, next) => {
//   try {
//     res.send(await Product.findByToken(req.headers.authorization));
//   } catch (ex) {
//     next(ex);
//   }
// });
