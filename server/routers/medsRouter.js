const express = require('express');
const medsRouter = express.Router();
const {
  fetchAllMedsApp,
  fetchDailyMedsApp,
  fetchMedsAlexa,
  addMed,
  updateMed,
  removeMed,
  takenMedsApp,
  takenMedsAlexa
} = require('../controllers/');
const { send405Error } = require('../../errors');


medsRouter
  .route('/app/taken/:user_id')
  .post(takenMedsApp)
  .all(send405Error);

medsRouter
  .route('/app/daily/:user_id')
  .get(fetchDailyMedsApp)

medsRouter
  .route('/app/all/:user_id')
  .get(fetchAllMedsApp)
  .post(addMed);

medsRouter
  .route('/app/all/:med_id')
  .patch(updateMed)
  .delete(removeMed)
  .all(send405Error);

medsRouter
  .route('/alexa')
  .get(fetchMedsAlexa)
  .post(takenMedsAlexa)
  .all(send405Error);

module.exports = { medsRouter };
