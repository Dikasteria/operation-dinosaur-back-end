const express = require("express");
const devicesRouter = express.Router();
const { fetchDevices } = require("../controllers/");

devicesRouter.route("/:user_id").get(fetchDevices);

module.exports = { devicesRouter };
