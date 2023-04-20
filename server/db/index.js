//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const CartItems = require('./models/CartItems');

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItems);
CartItems.belongsTo(Product);

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
