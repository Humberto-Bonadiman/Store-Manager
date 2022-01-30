const SalesService = require('../services/salesService');

const register = async (req, res) => {
  const sales = req.body;
  const sale = await SalesService.register(sales);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  return res.status(201).json(sale);
};

const getAllSale = async (_req, res) => {
  const products = await SalesService.getAllSale();
  return res.status(200).json(products);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getById(id);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(sale);
};

module.exports = {
  register,
  getAllSale,
  getSaleById,
};