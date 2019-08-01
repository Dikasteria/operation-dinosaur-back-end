const { getCode } = require('../models/');

exports.fetchCode = (req, res, next) => {
  getCode().then(code => {
    res.status(200).send({ code });
  });
};
