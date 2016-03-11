/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tacks              ->  index
 * POST    /api/tacks              ->  create
 * GET     /api/tacks/:id          ->  show
 * PUT     /api/tacks/:id          ->  update
 * DELETE  /api/tacks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Tack = require('./tack.model');
var ObjectId = require('mongoose').Types.ObjectId

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Tacks
export function index(req, res) {
  Tack.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single User's Tacks from the DB
export function show(req, res) {
  
  Tack.find({ author: new ObjectId('56b3e1022540edb10bec1d41') })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch( handleError(res));
}

// Creates a new Tack in the DB
export function create(req, res) {
  delete req.body.date

  Tack.createAsync(_.merge({ author: req.user._id }, req.body))
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Tack in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Tack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tack from the DB
export function destroy(req, res) {
  Tack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
