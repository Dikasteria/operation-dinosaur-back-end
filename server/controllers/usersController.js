const { postUser, getUser } = require('../models/');

exports.addUser = (req, res, next) => {
  postUser({ ...req.body }).then(user => {
    res.status(201).send({ user });
  });
};

exports.fetchUser = (req, res, next) => {
  getUser({ ...req.params })
    .then(users => {
      if (users.length < 1) {
        res.status(404).send({ msg: 'No user found' });
      } else {
        const user = users[0];
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
