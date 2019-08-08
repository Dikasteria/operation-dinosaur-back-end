const express = require('express');
const codesRouter = express.Router();
const { fetchCode, fetchAllCodes, pairDevice } = require('../controllers');
const { send405Error } = require('../../errors');

codesRouter
  .route('/')
  .get(fetchAllCodes)
  .all(send405Error);
codesRouter
  .route('/requestnew/:user_id')
  .get(fetchCode)
  .all(send405Error);
codesRouter
  .route('/alexa')
  .post(pairDevice)
  .all(send405Error);

module.exports = { codesRouter };
