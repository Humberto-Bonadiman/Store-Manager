const ProductService = require('../services/productService');

const withName = (response, request, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ message: '"name" is required' });
  }

  next();
};

const nameGreaterThanFour = (response, request, next) => {
  const { name } = request.body;
  if (name.length < 5) {
    return response.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const differentName = async (response, request, next) => {
  const { name } = request.body;
  const productName = await ProductService.findProductByName(name).then((result) => result);
  const sameName = productName.some((result) => result.name === name);

  if (sameName) {
    return response.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const withQuantity = (response, request, next) => {
  const { quantity } = request.body;
  if (!quantity) {
    return response.status(400).json({ message: '"quantity" is required' });
  }
  
  next();
};

const quantityIsNotString = (response, request, next) => {
  const { quantity } = request.body;
  if (typeof quantity !== 'number' || quantity < 1) {
    return response.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  withName,
  nameGreaterThanFour,
  differentName,
  withQuantity,
  quantityIsNotString,
};