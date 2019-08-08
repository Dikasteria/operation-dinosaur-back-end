const { apiRouter } = require('./server/routers/apiRouter');
const express = require('express');
const app = express();
const cors = require('cors');
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require('./errors');

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = { app };
