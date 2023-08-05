const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Image = require("../models/Image");


const getAll = catchError(async (req, res) => {
  const results = await Purchase.findAll({
    include: [{ model: Product, include: [Image]}],
    where: { userId: req.user.id },
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const productsCart = await Cart.findAll({ where: { userId: req.user.id } });
  const cartToPurchase = productsCart.map((item) =>
    Purchase.create({
      productId: item.productId,
      quantity: item.quantity,
      userId: item.userId,
    })
  );
  await Cart.destroy({ where: { userId: req.user.id } });
  const purchases = await Promise.all(cartToPurchase);

  return res.status(201).json(purchases);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Purchase.destroy({ where: { id } });
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  remove,
};
