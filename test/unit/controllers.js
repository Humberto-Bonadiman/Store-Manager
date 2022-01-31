const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require("mocha");

const productService = require('../../services/productService');
const productController = require('../../controllers/productController');
const { response } = require('express');

describe('Ao chamar o controller de create', () => {
/*   describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

    sinon.stub(productService, 'create')
      .resolves(false);
    });

    after(() => {
      productService.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado com a mensagem "Dados inválidos"', async () => {
      await productController.create(request, response);

      expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
    });
  }); */

  describe('quando é inserido com sucesso', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Notebook',
        quantity: 20
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

    sinon.stub(productService, 'create')
      .resolves({
        id: 1,
        name: 'Notebook',
        quantity: 20
      });
    });

    after(() => {
      productService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o produto adicionado', async () => {
      await productController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de getAll', () => {
  describe('quando não houver produtos', () => {
    const response = {};

    before(() => {
      response.send = sinon.stub().returns(response);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(productService, 'getAll').returns([]);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('chama o "response.json"', async () => {
      await productController.getAll({}, response);
      expect(response.json.calledOnce).to.be.true;

      const firstCall = response.json.getCall(0);
      const [products] = firstCall.args;
      expect(products).to.be.an('array');
      expect(products).to.be.empty;
    });

    it('chama o response.status com o valor 200', async () => {
      await productController.getAll({}, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('não chama o response.send', async () => {
      await productController.getAll({}, response);
      expect(response.send.calledOnce).to.be.false;
    });
  });

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const productsGetAll = [
      {
        id: 1,
        name: 'Notebook',
        quantity: 20
      },
      {
        id: 2,
        name: 'video game',
        quantity: 20
      }
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(productsGetAll);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getAll({}, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json"', async () => {
      await productController.getAll({}, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de getById', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productService, 'getById')
        .resolves({
          id: 1,
          name: 'Notebook',
          quantity: 20
        });
    });

    after(() => {
      productService.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});