const express = require('express');
const codesRouter = express.Router();
const { fetchCode } = require('../controllers');
const { send405Error } = require('../../errors');

codesRouter.route('/').all(send405Error);
codesRouter
  .route('/:user_id')
  .get(fetchCode)
  .all(send405Error);

module.exports = { codesRouter };
