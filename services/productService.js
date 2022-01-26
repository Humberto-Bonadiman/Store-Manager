const ProductModel = require('../models/productModel');

const findProductByName = async (name) => {
  try {
    const response = await ProductModel.findProductByName(name);
    return response;
  } catch (error) {
    return error;
  }
};

const create = async ({ name, quantity }) => {
  const product = await ProductModel.create(name, quantity);
  
  return {
    id: product.id,
    name,
    quantity,
  };
};

module.exports = {
  create,
  findProductByName,
};