const connection = require('./connection');

const findProductByName = async (nameToSearch) => {
  try {
    const query = 'SELECT name FROM StoreManager.products WHERE name = ?';

    const [result] = await connection.execute(query, [nameToSearch]);
    if (result.length === 0) return null;
    return result;
  } catch (error) {
    console.log(`ProductModel ${error}`);
  }
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (idProduct) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [result] = await connection.execute(query, [idProduct]);
  if (result.length === 0) return null;

  const resultMap = result.map(({ id, name, quantity }) => ({
    id,
    name,
    quantity,
  }));

  return Object.assign(...resultMap);
};

module.exports = {
  create,
  findProductByName,
  getAll,
  getById,
};
