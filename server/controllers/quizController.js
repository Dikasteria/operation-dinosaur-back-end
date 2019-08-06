const { getQuiz, postQuiz, patchQuiz, deleteQuiz, postQuizAlexa } = require('../models/');

exports.fetchQuiz = (req, res, next) => {
  getQuiz({ ...req.params })
    .then(quizzes => {
      if (quizzes.length < 1) {
        res.status(404).send({ msg: 'No quiz found' });
      } else {
        res.status(200).send({ quizzes });
      }
    })
    .catch(next);
};

exports.addQuiz = (req, res, next) => {
  postQuiz({ ...req.params, ...req.body })
    .then(quiz => {
      res.status(201).send({ quiz });
    })
    .catch(next);
};

exports.updateQuiz = (req, res, next) => {
  patchQuiz({ ...req.params, ...req.body })
    .then(patchedQuiz => {
      res.status(200).send({ patchedQuiz });
    })
    .catch(next);
};

exports.removeQuiz = (req, res, next) => {
  deleteQuiz({ ...req.params })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};

exports.addQuizAlexa = (req, res, next) => {
  if (req.headers.amazonid) {
    const { amazonid: amazon_id } = req.headers
    const { body } = req
    return postQuizAlexa({amazon_id, ...body})
      .then(({ confirmation }) => {
        res.status(201).send({ confirmation })
      })
      .catch(next)
  }
  return Promise.reject({status: 400, msg: 'bad request'})
}