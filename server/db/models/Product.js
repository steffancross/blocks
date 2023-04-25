const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2), //Can store up to 10 digits with 2 digits as decimal points
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg",
  },
});

module.exports = Product;
