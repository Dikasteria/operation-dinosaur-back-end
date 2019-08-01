const express = require('express');
const eventsRouter = express.Router();
const {
  fetchEvents,
  addEvent,
  updateEvent,
  removeEvent
} = require('../controllers/');
const { send405Error } = require('../../errors');

eventsRouter
  .route('/:user_id')
  .get(fetchEvents)
  .post(addEvent);

eventsRouter
  .route('/:event_id')
  .patch(updateEvent)
  .delete(removeEvent)
  .all(send405Error);

module.exports = { eventsRouter };
