const ProductService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService.create({ name, quantity });

  return res.status(201).json(product);
};

module.exports = {
  create,
};