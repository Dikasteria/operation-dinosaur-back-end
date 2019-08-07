const express = require('express');
const quizRouter = express.Router();
const {
  fetchQuiz,
  addQuiz,
  updateQuiz,
  removeQuiz,
  addQuizAlexa
} = require('../controllers/');
const { send405Error } = require('../../errors');

quizRouter
  .route('/app/:user_id')
  .get(fetchQuiz)
  .post(addQuiz);

quizRouter
  .route('/app/:quiz_id')
  .patch(updateQuiz)
  .delete(removeQuiz)
  .all(send405Error);

quizRouter
  .route('/alexa')
  .post(addQuizAlexa)
  .all(send405Error)

module.exports = { quizRouter };
