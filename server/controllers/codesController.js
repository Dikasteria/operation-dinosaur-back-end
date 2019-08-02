const { getCode, addCode, deleteCode, getAllCodes } = require('../models/');

exports.fetchCode = (req, res, next) => {
  const { user_id } = req.params;
  getCode().then(code => {
    addCode(user_id, code).then(([code]) => {
      res.status(200).send({ code });
      setTimeout(() => {
        deleteCode(code.id);
      }, 3000);
    });
  });
};

exports.fetchAllCodes = (req, res, next) => {
  getAllCodes().then(codes => {
    res.status(200).send({ codes });
  });
};
