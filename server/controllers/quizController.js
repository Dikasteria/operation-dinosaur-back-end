const { getQuiz, postQuiz, patchQuiz, deleteQuiz } = require('../models/');

exports.fetchQuiz = (req, res, next) => {
  getQuiz({ ...req.params }).then(quizzes => {
    res.status(200).send({ quizzes });
  });
};

exports.addQuiz = (req, res, next) => {
  postQuiz({ ...req.params, ...req.body }).then(quiz => {
    res.status(201).send({ quiz });
  });
};

exports.updateQuiz = (req, res, next) => {
  patchQuiz({ ...req.params, ...req.body }).then(patchedQuiz => {
    res.status(200).send({ patchedQuiz });
  });
};

exports.removeQuiz = (req, res, next) => {
  deleteQuiz({ ...req.params }).then(() => {
    res.status(204).send({});
  });
};
