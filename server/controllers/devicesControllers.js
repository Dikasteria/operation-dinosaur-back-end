const { getDevices } = require("../models/");

exports.fetchDevices = (req, res, next) => {
  getDevices({ ...req.params }).then(devices => {
    res.status(200).send({ devices });
  });
};
