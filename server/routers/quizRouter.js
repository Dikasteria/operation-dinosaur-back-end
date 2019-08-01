const express = require('express');
const quizRouter = express.Router();
const {
  fetchQuiz,
  addQuiz,
  updateQuiz,
  removeQuiz
} = require('../controllers/');
const { send405Error } = require('../../errors');

quizRouter
  .route('/:user_id')
  .get(fetchQuiz)
  .post(addQuiz);

quizRouter
  .route('/:quiz_id')
  .patch(updateQuiz)
  .delete(removeQuiz)
  .all(send405Error);

module.exports = { quizRouter };
