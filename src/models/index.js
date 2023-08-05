const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

Product.belongsTo(Category)
Category.hasMany(Product)

Image.belongsTo(Product)
Product.hasMany(Image)

Cart.belongsTo(Product)
Product.hasMany(Cart)

Cart.belongsTo(User)
User.hasMany(Cart)

Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

