const {
  getCode,
  addCode,
  deleteCode,
  getAllCodes,
  checkCode,
  acceptCode
} = require('../models/');

const codeExpiry = 30000;

fetchCode = (req, res, next) => {
  const { user_id } = req.params;
  getCode().then(code => {
    addCode(user_id, code).then(([code]) => {
      const { id } = code;
      res.status(200).send({ code });
      setTimeout(() => {
        deleteCode(id).then(result => console.log(`${result} authentication code(s) have expired`));
      }, codeExpiry);
    });
  });
};

fetchAllCodes = (req, res, next) => {
  getAllCodes().then(codes => {
    res.status(200).send({ codes });
  });
};

pairDevice = (req, res, next) => {
  if (req.headers && req.headers.amazonid) {
    const amazon_id = req.headers.amazonid;
    const inputCode = req.body.inputCode;
    return checkCode(inputCode).then(codes => {

      //matching code provided
      if(codes.length === 1) {
        const user_id = codes[0].user_id
        return acceptCode( user_id, amazon_id )
          .then(([addedDevice]) => {
            if(addedDevice.id){
              const confirmation = true;
              res.status(201).send({ confirmation });
            } else {
              const confirmation = false;
              res.status(500).send({ confirmation });
            };
          });
      };

      //no matching code provided
      if(codes.length === 0) {
        const confirmation = false;
        res.status(200).send({ confirmation });
      };

    })
    .catch(next);

  } else {
    //throw error - request doesnt have appropriate header
    next();
  };

};

module.exports = {
  fetchAllCodes,
  fetchCode,
  codeExpiry,
  pairDevice
};