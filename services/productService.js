const ProductModel = require('../models/productModel');

const findProductByName = async (nameToSearch) => {
  try {
    const response = await ProductModel.findProductByName(nameToSearch);
    if (!response) return null;
    return response;
  } catch (error) {
    return console.log(`ProductService ${error}`);
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