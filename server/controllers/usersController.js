const { postUser } = require("../models/");

exports.addUser = (req, res, next) => {
  postUser({ ...req.body }).then(user => {
    res.status(201).send({ user });
  });
};
