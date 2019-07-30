const express = require("express");
const devicesRouter = express.Router();
const { fetchDevices, addDevice } = require("../controllers/");

devicesRouter
  .route("/:user_id")
  .get(fetchDevices)
  .post(addDevice);

module.exports = { devicesRouter };
