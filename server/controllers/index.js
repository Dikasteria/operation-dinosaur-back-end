const userControllers = require('./usersController');
const deviceControllers = require('./devicesController');
const medsControllers = require('./medsController');
const eventControllers = require('./eventsController');
const quizControllers = require('./quizController');

module.exports = {
  ...userControllers,
  ...deviceControllers,
  ...medsControllers,
  ...eventControllers,
  ...quizControllers
};
