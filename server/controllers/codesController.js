const {
  getCode,
  addCode,
  deleteCode,
  getAllCodes,
  checkCode,
  rejectCode,
  acceptCode
} = require('../models/');

const codeExpiry = 3000;

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
  if (req.headers && req.headers.amazon_id) {
    const amazon_id = req.headers.amazon_id;
    const inputCode = req.body.inputCode;
    return checkCode(inputCode).then(codes => {

      //matching code provided
      if(codes.length === 1) {
        const user_id = codes[0].user_id
        return acceptCode( user_id, amazon_id )
          .then(([addedDevice]) => {
            if(addedDevice.id){
              const confirmation = 'device paired successfuly';
              res.status(201).send({ confirmation });
            } else {
              const confirmation = 'device failed to pair'
              res.status(500).send({ confirmation });
            };
          });
      };

      //no matching code provided
      if(codes.length === 0) {
        const confirmation = 'the entered code was not correct';
        res.status(400).send({ confirmation });
      };

    });

  } else {
    //throw error - request doesnt have appropriate header
  };

};

module.exports = {
  fetchAllCodes,
  fetchCode,
  codeExpiry,
  pairDevice
};