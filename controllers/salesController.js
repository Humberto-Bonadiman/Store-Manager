const SalesService = require('../services/salesService');

const validateSales = (req, res, next) => {
  const sales = req.body;
  const forEverySales = sales.every((sale) => sale.product_id !== undefined);
  if (!forEverySales) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  const everySalesQuantity = sales.every((sale) => sale.quantity !== undefined);
  if (!everySalesQuantity) {
    return res.status(422).json({ message: '"quantity" is required' });
  }

  next();
};

const validadeQuantity = (req, res, next) => {
  const sales = req.body;
  const everySales = sales.every((sale) => sale.quantity >= 1 || typeof sale.quantity === 'number');
  if (!everySales) {
    return res.status(400).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }

  next();
};

const register = async (req, res) => {
  const sales = req.body;

  const sale = await SalesService.register(sales);

  return res.status(201).json(sale);
};

module.exports = {
  validateSales,
  validadeQuantity,
  register,
};