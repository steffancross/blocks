//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const CartItems = require('./models/CartItems');

//associations could go here!
CartItems.belongsTo(Product);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.hasMany(CartItems);

Product.belongsToMany(Cart, { through: 'joinProductToCart' });

// CartItems.belongsTo(Cart);
// Cart.belongsTo(User, { foreignkey: "userid" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItems,
  },
};
