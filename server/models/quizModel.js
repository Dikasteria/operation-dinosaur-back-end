const { connection } = require('../connection');

exports.getQuiz = ({ user_id }) => {
  return connection
    .select('*')
    .from('quiz')
    .where({ user_id });
};

exports.postQuiz = ({ user_id, mood, stiffness, slowness, tremor }) => {
  const completed_at = new Date(Date.now());
  const quiz = {
    user_id,
    completed_at,
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

exports.patchQuiz = ({ quiz_id, mood, stiffness, slowness, tremor }) => {
  const newQuizDetails = { mood, stiffness, slowness, tremor };
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

exports.postQuizAlexa = ({ amazon_id, mood, stiffness, slowness, tremor }) => {
  return connection('devices')
    .where({amazon_id})
    .returning('*')
    .then(users => {
      if (!users.length) {
        return { confirmation: false }
      } else {
        const [{user_id}] = users
        const completed_at = new Date(Date.now());
        const quiz = { user_id, completed_at, mood, stiffness, slowness, tremor}
        return connection
        .insert(quiz)
        .into('quiz')
        .returning('*')
        .then(()=>{
          return { confirmation: true }
        })
      }
    })
}