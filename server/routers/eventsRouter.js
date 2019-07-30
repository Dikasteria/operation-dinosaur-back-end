const express = require('express');
const eventsRouter = express.Router();
const {
  fetchEvents,
  addEvent,
  updateEvent,
  removeEvent
} = require('../controllers/');

eventsRouter
  .route('/:user_id')
  .get(fetchEvents)
  .post(addEvent);

eventsRouter
  .route('/:event_id')
  .patch(updateEvent)
  .delete(removeEvent);

module.exports = { eventsRouter };
