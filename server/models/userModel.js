const { connection } = require('../connection');

exports.postUser = ({ first_name, surname }) => {
  const newUser = { first_name, surname };
  return connection
    .insert(newUser)
    .into('users')
    .returning('*')
    .then(([addedUser]) => {
      return addedUser;
    });
};

exports.getUser = ({ user_id }) => {
  return connection('users')
    .where({ id: user_id })
    .returning('*')
    .then(returnedUser => {
      if (returnedUser.length < 1)
        return Promise.reject({ status: 404, msg: 'No user found' });
      else return returnedUser[0];
    });
};
