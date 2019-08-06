const express = require('express');
const devicesRouter = express.Router();
const { fetchDevices, addDevice } = require('../controllers/');
const { send405Error } = require('../../errors');

devicesRouter
  .route('/app/:user_id')
  .get(fetchDevices)
  .post(addDevice)
  .all(send405Error);

devicesRouter

module.exports = { devicesRouter };
