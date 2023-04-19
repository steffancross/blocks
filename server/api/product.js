const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Product } = models;

// get all campuses
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
