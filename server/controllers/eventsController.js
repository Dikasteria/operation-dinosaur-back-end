const { getEvents, postEvent, patchEvent, deleteEvent } = require('../models/');

exports.fetchEvents = (req, res, next) => {
  getEvents({ ...req.params }).then(events => {
    res.status(200).send({ events });
  });
};

exports.addEvent = (req, res, next) => {
  postEvent({ ...req.params, ...req.body }).then(event => {
    res.status(201).send({ event });
  });
};

exports.updateEvent = (req, res, next) => {
  patchEvent({ ...req.params, ...req.body }).then(patchedEvent => {
    res.status(200).send({ patchedEvent });
  });
};

exports.removeEvent = (req, res, next) => {
  deleteEvent({ ...req.params }).then(() => {
    res.status(204).send({});
  });
};
