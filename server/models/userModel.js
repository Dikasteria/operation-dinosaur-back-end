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
  return connection
    .select('*')
    .from('users')
    .where({ id: user_id });
};
