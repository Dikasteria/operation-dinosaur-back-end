const { getEvents, postEvent, patchEvent, deleteEvent } = require('../models/');

exports.fetchEvents = (req, res, next) => {
  getEvents({ ...req.params })
    .then(events => {
      if (events.length < 1) {
        res.status(404).send({ msg: 'No events found' });
      } else {
        res.status(200).send({ events });
      }
    })
    .catch(next);
};

exports.addEvent = (req, res, next) => {
  postEvent({ ...req.params, ...req.body })
    .then(event => {
      res.status(201).send({ event });
    })
    .catch(next);
};

exports.updateEvent = (req, res, next) => {
  if (typeof req.body.description === 'string') {
    patchEvent({ ...req.params, ...req.body })
      .then(patchedEvent => {
        res.status(200).send({ patchedEvent });
      })
      .catch(next);
  } else {
    res.status(400).send({ msg: 'bad request' });
  }
};

exports.removeEvent = (req, res, next) => {
  deleteEvent({ ...req.params })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
