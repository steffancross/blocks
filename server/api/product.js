//const express = require("express");
//const router = express.Router();
//const { models } = require("../db");
//const { Product } = models;

const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware.js");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    res.json(singleProduct);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, price, quantity, description } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      quantity,
      description,
    });
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
