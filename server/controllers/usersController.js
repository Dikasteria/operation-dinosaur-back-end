const { postUser, getUser } = require('../models/');

exports.addUser = (req, res, next) => {
  postUser({ ...req.body }).then(user => {
    res.status(201).send({ user });
  });
};

exports.fetchUser = (req, res, next) => {
  getUser({ ...req.params }).then(user => {
    res.status(200).send({ user });
  });
};
