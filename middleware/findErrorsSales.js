// const productService = require('../services/productService');

/* const withProductId = (request, response, next) => {
  const sales = request.body;
  sales.forEach((sale) => {
    if (!('product_id' in sale)) {
      return response.status(400).json({ message: '"product_id" is required' });        
    }
  });

  next();
};

const withQuantitySale = (request, response, next) => {
  const sales = request.body;
  const mapSales = sales.every((sale) => sale.quantity !== undefined);
  console.log(mapSales);
  if (mapSales === false) {
    return response.status(422).json({ message: '"quantity" is required' });
  }

  next();
};

const quantityIsNotStringSale = (request, response, next) => {
  const sales = request.body;
  const mapSales = sales.every((sale) => typeof sale.quantity !== 'number' || sale.quantity < 1);
  if (!mapSales) {
    return response.status(400)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  withProductId,
  withQuantitySale,
  quantityIsNotStringSale,
}; */