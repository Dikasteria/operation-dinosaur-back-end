const express = require('express');
const usersRouter = express.Router();
const { addUser, fetchUser } = require('../controllers/');

usersRouter.route('/').post(addUser);
usersRouter.route('/:user_id').get(fetchUser);
// .all(console.log("err"));

module.exports = { usersRouter };
