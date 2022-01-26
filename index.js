require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/productController');
const {
  withName,
  nameGreaterThanFour,
  differentName,
  withQuantity,
  quantityIsNotString,
} = require('./middleware/findErrors');

const app = express();

app.use(bodyParser.json());

app.post(
  '/products',
  withName,
/*   nameGreaterThanFour,
  differentName,
  withQuantity,
  quantityIsNotString,
  ProductController.create, */
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
