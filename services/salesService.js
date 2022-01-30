const salesModel = require('../models/salesModel');

const register = async (sales) => {
  const id = await salesModel.register();
  if (!sales) return false;
  const createObjectSale = {
    id,
    itemsSold: sales,
  };

  const promiseSale = sales.map(async ({ product_id, quantity }) => {
    await salesModel.create(id, product_id, quantity);
  });

  await Promise.all(promiseSale);

  return createObjectSale;
};

const getAllSale = async () => salesModel.getAllSale();

const getById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return null;

  return sale;
};

module.exports = {
  register,
  getAllSale,
  getById,
};