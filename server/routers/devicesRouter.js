const express = require('express');
const devicesRouter = express.Router();
const { fetchDevices, addDevice, fetchPair } = require('../controllers/');
const { send405Error } = require('../../errors');

devicesRouter
  .route('/app/:user_id')
  .get(fetchDevices)
  .post(addDevice)
  .all(send405Error);

devicesRouter
  .route('/alexa')
  .get(fetchPair)
  .all(send405Error)

module.exports = { devicesRouter };
