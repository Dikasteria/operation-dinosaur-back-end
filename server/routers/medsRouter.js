const express = require('express');
const medsRouter = express.Router();
const { fetchMeds, addMed, updateMed, removeMed } = require('../controllers/');

medsRouter
  .route('/:user_id')
  .get(fetchMeds)
  .post(addMed);

medsRouter
  .route('/:med_id')
  .patch(updateMed)
  .delete(removeMed);

module.exports = { medsRouter };
