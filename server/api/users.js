const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware.js");

// The requireToken middleware is used to ensure that the user making the request has a valid token
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    //Non-admins are unable to view all users in the system
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .send(
          "You are not an admin. Go to jail. Do not pass go. Do not collect $200."
        );
    }

    // Find all users in the database, and only select their id and email fields
    const users = await User.findAll({
      attributes: ["id", "email"],
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    //Non-admins are unable to view all users in the system
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .send(
          "You are not an admin. Go to jail. Do not pass go. Do not collect $200."
        );
    }

    // Find all users in the database, and only select their id and email fields
    const singleUser = await User.findByPk(req.params.id);
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
