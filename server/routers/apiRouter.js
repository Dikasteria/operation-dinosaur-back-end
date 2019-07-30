const express = require('express');
const apiRouter = express.Router();
const { usersRouter } = require('./usersRouter');
const { devicesRouter } = require('./devicesRouter');
const { medsRouter } = require('./medsRouter');
const { eventsRouter } = require('./eventsRouter');

// apiRouter.route("/").all(errHandle405);
apiRouter.use('/users', usersRouter);
apiRouter.use('/devices', devicesRouter);
apiRouter.use('/meds', medsRouter);
apiRouter.use('/events', eventsRouter);

module.exports = { apiRouter };
