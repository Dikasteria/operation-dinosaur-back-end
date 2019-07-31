const express = require('express');
const usersRouter = express.Router();
const { addUser, fetchUser } = require('../controllers/');
const { send405Error } = require('../../errors');

usersRouter
  .route('/')
  .post(addUser)
  .all(send405Error);
usersRouter
  .route('/:user_id')
  .get(fetchUser)
  .all(send405Error);

module.exports = { usersRouter };
