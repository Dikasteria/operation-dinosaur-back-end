const express = require('express');
const apiRouter = express.Router();
const { fetchEndpoints } = require('../controllers/');
const { codesRouter } = require('./codesRouter');
const { usersRouter } = require('./usersRouter');
const { devicesRouter } = require('./devicesRouter');
const { medsRouter } = require('./medsRouter');
const { eventsRouter } = require('./eventsRouter');
const { quizRouter } = require('./quizRouter');

apiRouter.route('/').get(fetchEndpoints);
apiRouter.use('/codes', codesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/devices', devicesRouter);
apiRouter.use('/meds', medsRouter);
apiRouter.use('/events', eventsRouter);
apiRouter.use('/quiz', quizRouter);

module.exports = { apiRouter };
