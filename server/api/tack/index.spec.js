'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tackCtrlStub = {
  index: 'tackCtrl.index',
  show: 'tackCtrl.show',
  create: 'tackCtrl.create',
  update: 'tackCtrl.update',
  destroy: 'tackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tackIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tack.controller': tackCtrlStub
});

describe('Tack API Router:', function() {

  it('should return an express router instance', function() {
    tackIndex.should.equal(routerStub);
  });

  describe('GET /api/tacks', function() {

    it('should route to tack.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tackCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tacks/:id', function() {

    it('should route to tack.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tackCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tacks', function() {

    it('should route to tack.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tackCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tacks/:id', function() {

    it('should route to tack.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tacks/:id', function() {

    it('should route to tack.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tacks/:id', function() {

    it('should route to tack.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tackCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
