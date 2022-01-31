const validateSales = (req, res, next) => {
  const sales = req.body;
  const forEverySales = sales.every((sale) => sale.product_id !== undefined);
  if (!forEverySales) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  const everySalesQuantity = sales.every((sale) => sale.quantity !== undefined);
  if (!everySalesQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validadeQuantity = (req, res, next) => {
  const sales = req.body;
  const everySales = sales.every((sale) => typeof sale.quantity === 'number');
  const equalToZero = sales.every((sale) => sale.quantity === 0);
  const lessThanZero = sales.every((sale) => sale.quantity < 0);
  if (!everySales || equalToZero || lessThanZero) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }

  next();
};

module.exports = {
  validateSales,
  validadeQuantity,
};