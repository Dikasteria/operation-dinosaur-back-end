const codeModels = require('./codesModel');
const userModels = require('./userModel');
const deviceModels = require('./devicesModel');
const medsModels = require('./medsModel');
const eventModels = require('./eventsModel');
const quizModels = require('./quizModel');

module.exports = {
  ...codeModels,
  ...userModels,
  ...deviceModels,
  ...medsModels,
  ...eventModels,
  ...quizModels
};
