const connection = require('./connection');

/* Nesta paarte eu consultei o repositório do Luiz Gustavo
Fonte: https://github.com/tryber/sd-014-b-store-manager/pull/60/files */
const register = async (sales) => {
  const query = 'INSERT INTO StoreManager.sales VALUES ();';
  const [data] = await connection.execute(query);

  sales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?);',
      [data.insertId, sale.product_id, sale.quantity],
      );
  });

  return {
    id: data.insertId,
    itemsSold: sales,
  };
};

module.exports = {
  register,
};