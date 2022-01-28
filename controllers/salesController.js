const SalesService = require('../services/salesService');

const register = async (req, res) => {
  const sales = req.body;

  const sale = await SalesService.register(sales);

  return res.status(201).json(sale);
};

module.exports = {
  register,
};