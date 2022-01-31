const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');
// const salesModel = require('../../models/salesModel');

describe('Insere um novo produto no BD', () => {
  const addProduct = {
    name: 'Notebook',
    quantity: 20
  };

  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await productModel.create(addProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productModel.create(addProduct);

      expect(response).to.have.a.property('id');
    })
  })
});

describe('Busca todos os produtos no banco de dados', () => {
  describe('quando não existem produtos no banco de dados', () => {
    before(async () => {
      const execute = [[]];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.an('array');
    });

    it('retorna um array vazio', async () => {
      const response = await productModel.getAll();
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
      const response = await productModel.getAll();

      expect(response).to.be.an('array');
    });

    it('retorna um array não vazio', async () => {
      const response = await productModel.getAll();

      expect(response).not.to.be.empty;
    });

    it('retorna um array com um objeto contendo as seguintes propriedades', async () => {
      const response = await productModel.getAll();

      response.forEach((product) => expect(product).to.include.all.keys('id', 'name', 'quantity'));
    })
  });
})

describe('Busca apenas um produto no BD por seu Id', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe o produto informado', () => {
    it('retorna "null"', async () => {
      const response = await productModel.getById();
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
        });
    });

    after(() => {
      productModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productModel.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productModel.getById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades "id", "name" e "quantity"', async () => {
      const response = await productModel.getById(1);

      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});