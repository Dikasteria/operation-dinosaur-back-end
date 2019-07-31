const userModels = require('./userModel');
const deviceModels = require('./devicesModel');
const medsModels = require('./medsModel');
const eventModels = require('./eventsModel');
const quizModels = require('./quizModel');

module.exports = {
  ...userModels,
  ...deviceModels,
  ...medsModels,
  ...eventModels,
  ...quizModels
};
