const { getDevices, postDevice } = require('../models');

exports.fetchDevices = (req, res, next) => {
  getDevices({ ...req.params })
    .then(devices => {
      if (devices.length < 1) {
        res.status(404).send({ msg: 'No devices found' });
      } else if (devices.length === 1) {
        const device = devices[0];
        res.status(200).send({ device });
      } else {
        res.status(200).send({ devices });
      }
    })
    .catch(next);
};

exports.addDevice = (req, res, next) => {
  postDevice({ ...req.params, ...req.body }).then(device => {
    res.status(201).send({ device });
  });
};
