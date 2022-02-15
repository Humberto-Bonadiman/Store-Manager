require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/productController');
const {
  withName,
  nameGreaterThanFour,
  differentName,
  sameId,
  withQuantity,
  quantityIsNotString,
} = require('./middleware/findErrors');

const SalesController = require('./controllers/salesController');
const {
  validateSales,
  validadeQuantity,
} = require('./middleware/findErrorsSales');

const app = express();

app.use(bodyParser.json());

app.post(
  '/products',
  withName,
  nameGreaterThanFour,
  differentName,
  withQuantity,
  quantityIsNotString,
  ProductController.create,
);

app.get('/products', ProductController.getAll);

app.get('/products/:id', ProductController.getById);

app.put(
  '/products/:id',
  withName,
  nameGreaterThanFour,
  sameId,
  withQuantity,
  quantityIsNotString,
  ProductController.update,
);

app.delete('/products/:id', ProductController.deleteProduct);

app.post(
  '/sales',
  validateSales,
  validadeQuantity,
  SalesController.register,
);

app.get('/sales', SalesController.getAllSale);
app.get('/sales/:id', SalesController.getSaleById);

app.put(
  '/sales/:id', validateSales,
  validadeQuantity,
  SalesController.updateRegister,
);

app.delete('/sales/:id', SalesController.deleteSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
