const express = require('express');
const medsRouter = express.Router();
const { fetchMeds, addMed, updateMed, removeMed } = require('../controllers/');
const { send405Error } = require('../../errors');

medsRouter
  .route('app/:user_id')
  .get(fetchMeds)
  .post(addMed);

medsRouter
  .route('app/:med_id')
  .patch(updateMed)
  .delete(removeMed)
  .all(send405Error);

medsRouter
  .route('app/taken')
  .post(takenMed)
  .all(send405Error);

medsRouter
  .route('alexa')
  .get()
  .post()
  .all(send405Error);

module.exports = { medsRouter };
