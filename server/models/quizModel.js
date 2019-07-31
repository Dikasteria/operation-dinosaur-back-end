const { connection } = require('../connection');

exports.getQuiz = ({ user_id }) => {
  return connection('quiz')
    .where({ user_id })
    .returning('*')
    .then(returnedQuiz => {
      if (returnedQuiz.length < 1)
        return Promise.reject({ status: 404, msg: 'No quiz found' });
      else return returnedQuiz;
    });
};

exports.postQuiz = ({
  user_id,
  due,
  status,
  mood,
  stiffness,
  slowness,
  tremor
}) => {
  const completed_at = new Date(Date.now());
  const quiz = {
    user_id,
    due,
    completed: true,
    completed_at,
    status,
    mood,
    stiffness,
    slowness,
    tremor
  };
  return connection
    .insert(quiz)
    .into('quiz')
    .returning('*')
    .then(([addedQuiz]) => {
      return addedQuiz;
    });
};

exports.patchQuiz = ({
  quiz_id,
  status,
  mood,
  stiffness,
  slowness,
  tremor
}) => {
  const newQuizDetails = { status, mood, stiffness, slowness, tremor };
  return connection('quiz')
    .where({ id: quiz_id })
    .update(newQuizDetails)
    .returning('*')
    .then(([patchedQuiz]) => {
      return patchedQuiz;
    });
};

exports.deleteQuiz = ({ quiz_id }) => {
  return connection('quiz')
    .where({ id: quiz_id })
    .delete();
};
