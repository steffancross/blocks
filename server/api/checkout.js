const express = require('express');
const router = express.Router();
const { models } = require('../db');

router.put("/", async (req, res, next) => {
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


module.exports = router;