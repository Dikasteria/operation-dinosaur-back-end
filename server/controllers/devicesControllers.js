const { getDevices, postDevice } = require("../models/");

exports.fetchDevices = (req, res, next) => {
  getDevices({ ...req.params }).then(devices => {
    res.status(200).send({ devices });
  });
};

exports.addDevice = (req, res, next) => {
  postDevice({ ...req.params, ...req.body }).then(device => {
    res.status(201).send({ device });
  });
};
