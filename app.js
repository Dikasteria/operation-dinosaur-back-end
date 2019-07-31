const { apiRouter } = require('./server/routers/apiRouter');
const express = require('express');
const app = express();
const cors = require('cors');
const { handlePsqlErrors } = require('./errors');

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.use(handlePsqlErrors);

module.exports = { app };
