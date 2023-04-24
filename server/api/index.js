const express = require("express");
const router = require("express").Router();


router.use("/users", require("./users"));
router.use("/products", require("./product"));
router.use("/carts", require("./carts"));
router.use("/checkout", require("./checkout"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;

