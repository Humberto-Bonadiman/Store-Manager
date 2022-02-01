const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/productModel');
const productService = require('../../services/productService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');
const connection = require('../../models/connection');

describe('Insere um novo produto no BD', () => {
  describe('quando é inserido com sucesso', () => {
    const addProduct = {
      name: 'Notebook',
      quantity: 20
    };

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(productModel, 'create')
        .resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      productModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productService.create(addProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do produto adicionado', async () => {
      const response = await productService.create(addProduct);

      expect(response).to.have.a.property('id');
    });
  });
});

describe('Busca todos os produtos no banco de dados pelo Service', () => {
  describe('quando não existem produtos no banco de dados', () => {
    before(async () => {
      const execute = [[]];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
    });

    it('retorna um array vazio', async () => {
      const response = await productService.getAll();
      expect(response).to.be.empty;
    });
  });

  describe('quando existem produtos no banco de dados', () => {
    before(() => {
      sinon.stub(productModel, 'getAll')
        .resolves([{
          id: 1,
          name: 'Notebook',
          quantity: 20
        },
        {
          id: 2,
          name: 'video game',
          quantity: 20
        }]);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
    });

    it('retorna um array não vazio', async () => {
      const response = await productService.getAll();

      expect(response).not.to.be.empty;
    });

    it('retorna um array com um objeto contendo as seguintes propriedades', async () => {
      const response = await productService.getAll();

      response.forEach((product) => expect(product).to.include.all.keys('id', 'name', 'quantity'));
    });
  });
});

describe('Busca apenas um produto no banco de dados', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o id informado', () => {
    it('retorna null', async () => {
      const response = await productService.getById();

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o id informado', () => {
    before(() => {
      sinon.stub(productModel, 'getById')
        .resolves({
          id: 1,
          name: 'Notebook',
          quantity: 20          
        })
    });

    after(() => {
      productModel.getById.restore();;
    });

    it('retorna um objeto', async () => {
      const response = await productService.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productService.getById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades "id", "name", "quantity"', async () => {
      const response = await productService.getById(1);

      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Atualiza um produto no banco de dados conforme id informado', () => {
  describe('quando não existe um produto com o id informado', () => {
    before(async () => {
      const execute = [[]];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await productService.deleteProduct();

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o id informado', () => {
    before(async () => {
      const execute = {
        id: 1,
        name: 'Notebook',
        quantity: 20
      };
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    const newId = 1;
    const newName = 'Video Game';
    const newQuantity = 50;

    it('retorna um objeto', async () => {
      const response = await productService.update(newId, newName, newQuantity);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productService.update(newId, newName, newQuantity);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades "id", "name", "quantity"', async () => {
      const response = await productService.update(newId, newName, newQuantity);

      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Deleta um produto no banco de dados conforme id informado', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o id informado', () => {
    it('retorna null', async () => {
      const response = await productService.deleteProduct();

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o id informado', () => {
    before(() => {
      sinon.stub(productModel, 'deleteProduct')
        .resolves({
          id: 1,
          name: 'Notebook',
          quantity: 20          
        })
    });

    after(() => {
      productModel.deleteProduct.restore();;
    });

    it('retorna um objeto', async () => {
      const response = await productService.deleteProduct(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productService.deleteProduct(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades "id", "name", "quantity"', async () => {
      const response = await productService.deleteProduct(1);

      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Busca todas as vendas no banco de dados pelo Service', () => {
  describe('quando existem vendas no banco de dados', () => {
    before(() => {
      sinon.stub(salesModel, 'getAllSale')
        .resolves([{
          saleId: 1,
          date: '2022-02-01T01:24:26.000Z',
          product_id: 1,
          quantity: 20
        },
        {
          saleId: 2,
          date: "2022-02-01T01:32:25.000Z",
          product_id: 2,
          quantity: 20
      }]);
    });

    after(() => {
      salesModel.getAllSale.restore();
    });

    it('retorna um array', async () => {
      const response = await salesService.getAllSale();

      expect(response).to.be.an('array');
    });
  });
});