const connection = require('./connection');

const DEZ = 10;

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

const updateRegister = async (itemUpdated, parseId) => {
  const productId = itemUpdated[0].product_id;
  const { quantity } = itemUpdated[0];
  const query = `UPDATE StoreManager.sales_products
    SET product_id=?, quantity=?
    WHERE sale_Id=?`;
  await connection.execute(query, [productId, quantity, parseId]);
  const saleId = parseInt(parseId, DEZ);
  
  return { saleId, itemUpdated };
};

module.exports = {
  create,
  getAllSale,
  register,
  getSaleById,
  updateRegister,
};