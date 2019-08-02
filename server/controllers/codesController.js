const { getCode, addCode, deleteCode } = require('../models/');

exports.fetchCode = (req, res, next) => {
  getCode().then(code => {
    addCode({ ...req.params }, code).then(([{ code }]) => {
      res.status(200).send({ code });
      setTimeout(() => {
        deleteCode(code);
      }, 900000);
    });
  });
};
