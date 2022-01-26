const ProductService = require('../services/productService');

const withName = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ message: '"name" is required' });
  }

  next();
};

const nameGreaterThanFour = (request, response, next) => {
  const { name } = request.body;
  if (name.length < 5) {
    return response.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const differentName = async (request, response, next) => {
  const { name } = request.body;
  const productName = await ProductService.findProductByName(name);
  if (!productName) return next();
  const sameName = productName.some((result) => result.name === name);

  if (sameName) {
    return response.status(409).json({ message: 'Product already exists' });
  }
};

const sameId = async (request, response, next) => {
  const { id } = request.params;
  const productId = await ProductService.findProductById(id);
  if (!productId) {
    return response.status(404).json({ message: 'Product not found' });
  }

  next();
};

const withQuantity = (request, response, next) => {
  const { quantity } = request.body;
  if (quantity === undefined) {
    return response.status(400).json({ message: '"quantity" is required' });
  }
  
  next();
};

const quantityIsNotString = (request, response, next) => {
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
  sameId,
  withQuantity,
  quantityIsNotString,
};