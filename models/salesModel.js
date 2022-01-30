const connection = require('./connection');

const register = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ();';
  const [data] = await connection.execute(query);

  return data.insertId;
};

const create = async (colum1, colum2, colum3) => {
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const sale = await connection.execute(query, [colum1, colum2, colum3]);
  return sale;
};

const getAllSale = async () => {
  const query = `SELECT a.sale_Id AS saleId, b.date, a.product_id, a.quantity
  FROM StoreManager.sales_products AS a
  INNER JOIN sales AS b
  ON a.sale_Id = b.id`;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (idSale) => {
  const query = `SELECT a.date, b.product_id, b.quantity
  FROM StoreManager.sales AS a
  INNER JOIN sales_products AS b
  ON a.id = b.sale_Id
  WHERE id=?`;
  const [result] = await connection.execute(query, [idSale]);
  if (result.length === 0) return null;
  return result;
};

module.exports = {
  create,
  getAllSale,
  register,
  getSaleById,
};