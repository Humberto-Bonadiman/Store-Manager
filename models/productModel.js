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

module.exports = {
  create,
  findProductByName,
};
