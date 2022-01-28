const ProductService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService.create({ name, quantity });

  return res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductService.update(name, quantity, id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.deleteProduct(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProduct,
};