const express = require('express');
const quizRouter = express.Router();
const {
  fetchQuiz,
  addQuiz,
  updateQuiz,
  removeQuiz
} = require('../controllers/');

quizRouter
  .route('/:user_id')
  .get(fetchQuiz)
  .post(addQuiz);

quizRouter
  .route('/:quiz_id')
  .patch(updateQuiz)
  .delete(removeQuiz);

module.exports = { quizRouter };
