const { getDevices, postDevice, checkCode } = require('../models');

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
  const { push_key, amazon_id, code } = req.body;

  if (amazon_id.length) {
    checkCode(code).then(result => {
      if (!result) {
        res.status(400).send({ msg: 'code does not exist' });
      }
    });
  }

  postDevice({ ...req.params, push_key, amazon_id })
    .then(device => {
      res.status(201).send({ device });
    })
    .catch(next);
};
