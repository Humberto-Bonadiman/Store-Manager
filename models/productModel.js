const connection = require('./connection');

const DEZ = 10;

function mapFuction(resultFromSearch) {
  return resultFromSearch.map(({ id, name, quantity }) => ({
    id,
    name,
    quantity,
  }));
}

const findProductByName = async (nameToSearch) => {
  try {
    const query = 'SELECT name FROM StoreManager.products WHERE name = ?';

    const [result] = await connection.execute(query, [nameToSearch]);
    if (result.length === 0) return null;
    return result;
  } catch (error) {
    console.log(`ProductModel name ${error}`);
  }
};

const findProductById = async (idToSearch) => {
  try {
    const query = 'SELECT id FROM StoreManager.products WHERE id = ?';
    const [result] = await connection.execute(query, [idToSearch]);
    if (result.length === 0) return null;
    return result;
  } catch (error) {
    console.log(`ProductModel id ${error}`);
  }
};
//
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

  return Object.assign(...mapFuction(result));
};

const update = async (name, quantity, parseId) => {
  const query = 'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?';
  await connection.execute(query, [name, quantity, parseId]);
  const id = parseInt(parseId, DEZ);

  return { id, name, quantity };
};

module.exports = {
  create,
  findProductByName,
  findProductById,
  getAll,
  getById,
  update,
};
