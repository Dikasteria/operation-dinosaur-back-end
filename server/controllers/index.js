const { addUser } = require('./usersController');
const { fetchDevices, addDevice } = require('./devicesController');
const { fetchMeds, addMed, updateMed, removeMed } = require('./medsController');
const {
  fetchEvents,
  addEvent,
  updateEvent,
  removeEvent
} = require('./eventsController');
const {
  fetchQuiz,
  addQuiz,
  updateQuiz,
  removeQuiz
} = require('./quizController');

module.exports = {
  addUser,
  fetchDevices,
  addDevice,
  fetchMeds,
  addMed,
  updateMed,
  removeMed,
  fetchEvents,
  addEvent,
  updateEvent,
  removeEvent,
  fetchQuiz,
  addQuiz,
  updateQuiz,
  removeQuiz
};
