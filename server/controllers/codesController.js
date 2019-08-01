const { getCode } = require('../models/');

exports.fetchCode = (req, res, next) => {
  const code = getCode();
  res.status(200).send({ code });
};
