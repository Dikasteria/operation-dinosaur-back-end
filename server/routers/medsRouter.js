const express = require('express');
const medsRouter = express.Router();
const { fetchMeds, addMed, updateMed, removeMed } = require('../controllers/');
const { send405Error } = require('../../errors');

medsRouter
  .route('/:user_id')
  .get(fetchMeds)
  .post(addMed);

medsRouter
  .route('/:med_id')
  .patch(updateMed)
  .delete(removeMed)
  .all(send405Error);

module.exports = { medsRouter };
