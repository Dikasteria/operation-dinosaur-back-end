const { postUser } = require('./userModel');
const { getDevices, postDevice } = require('./devicesModel');
const { getMeds, postMed, patchMed, deleteMed } = require('./medsModel');
const {
  getEvents,
  postEvent,
  patchEvent,
  deleteEvent
} = require('./eventsModel');
const { getQuiz, postQuiz, patchQuiz, deleteQuiz } = require('./quizModel');

module.exports = {
  postUser,
  getDevices,
  postDevice,
  getMeds,
  postMed,
  patchMed,
  deleteMed,
  getEvents,
  postEvent,
  patchEvent,
  deleteEvent,
  getQuiz,
  postQuiz,
  patchQuiz,
  deleteQuiz
};

```suggestion
const usermodels = require('./userModel');
const deviceModels = require('./devicesModel');
const medsModels = require('./medsModel');
const eventModels = require('./eventsModel');
const quizModels = require('./quizModel');

module.exports = {
  ...usermodels,
  ...deviceModels,
  ...medsModels,
  ...eventModels,
  ...quizModels
};
```
