const express = require('express');
const codesRouter = express.Router();
const { fetchcode } = require('../controllers');
const { send405Error } = require('../../errors');

codesRouter.route('/').all(send405Error);
codesRouter
  .route('/new')
  .get(fetchcode)
  .all(send405Error);

module.exports = { codesRouter };
