const { codes, users, devices, events, meds, quiz } = require('../index');
const { formatDate } = require('../../utils/formatData');

exports.seed = function(knex, test) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex('users').insert(users);
    })
    .then(() => {
      return knex('devices').insert(devices);
    })
    .then(() => {
      const formattedEvents = formatDate(events, 'time');
      return knex('events').insert(formattedEvents);
    })
    .then(() => {
      let formattedMeds = formatDate(meds, 'due');
      formattedMeds = formatDate(formattedMeds, 'taken_at');
      return knex('meds').insert(formattedMeds);
    })
    .then(() => {
      let formattedQuiz = formatDate(quiz, 'completed_at');
      return knex('quiz').insert(formattedQuiz);
    });
};
