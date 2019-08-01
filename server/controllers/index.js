const endpointControllers = require('./endpointsController');
// const codeControllers = require('./codesController');
const userControllers = require('./usersController');
const deviceControllers = require('./devicesController');
const medsControllers = require('./medsController');
const eventControllers = require('./eventsController');
const quizControllers = require('./quizController');

module.exports = {
  ...endpointControllers,
  // ...codeControllers,
  ...userControllers,
  ...deviceControllers,
  ...medsControllers,
  ...eventControllers,
  ...quizControllers
};
