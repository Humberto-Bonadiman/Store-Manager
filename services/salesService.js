const salesModel = require('../models/salesModel');

const register = async (sales) => {
  const sale = await salesModel.register(sales);

  return sale;
};

module.exports = {
  register,
};