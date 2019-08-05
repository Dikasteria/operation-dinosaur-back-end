const express = require('express');
const medsRouter = express.Router();
const {
  fetchMedsApp,
  fetchMedsAlexa,
  addMed,
  updateMed,
  removeMed,
  takenMedsApp,
  takenMedsAlexa
} = require('../controllers/');
const { send405Error } = require('../../errors');

medsRouter
  .route('/app/:user_id')
  .get(fetchMedsApp)
  .post(addMed);

medsRouter
  .route('/app/:med_id')
  .patch(updateMed)
  .delete(removeMed)
  .all(send405Error);

medsRouter
  .route('/app/taken')
  .post(takenMedsApp)
  .all(send405Error);

medsRouter
  .route('/alexa')
  .get(fetchMedsAlexa)
  .post(takenMedsAlexa)
  .all(send405Error);

module.exports = { medsRouter };
