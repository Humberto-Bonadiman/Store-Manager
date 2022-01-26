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

const findProductById = async (idToSearch) => {
  try {
    const response = await ProductModel.findProductById(idToSearch);
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

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (!product) return null;

  return product;
};

const update = async (name, quantity, id) => {
  const product = await ProductModel.update(name, quantity, id);

  if (!product) return null;

  return product;
};

module.exports = {
  create,
  findProductByName,
  findProductById,
  getAll,
  getById,
  update,
};