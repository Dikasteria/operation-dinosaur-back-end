const { users, devices, events, meds, quiz } = require("../index");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex("users").insert(users);
    })
    .then(() => {
      const devicesInsertions = knex("devices").insert(devices);
      const eventsInsertions = knex("events").insert(events);
      const medsInsertions = knex("meds").insert(meds);
      const quizInsertions = knex("quiz").insert(quiz);
      return Promise.all([
        devicesInsertions,
        eventsInsertions,
        medsInsertions,
        quizInsertions
      ]);
    });
};
