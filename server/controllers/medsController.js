const { getMeds, getMedsAlexa, postMed, patchMed, deleteMed, patchMedTakenApp } = require('../models/');

exports.fetchMedsApp = (req, res, next) => {
  getMeds({ ...req.params })
    .then(meds => {
      res.status(200).send({ meds });
      // if (meds.length < 1) {
      //   res.status(200).send({ msg: 'No medications found' });
      // } else {
      //   res.status(200).send({ meds });
      // }
    })
    .catch(next);
};

exports.fetchMedsAlexa = (req, res, next) => {
    if(req.headers && req.headers.amazon_id){
      const amazon_id = req.headers.amazon_id;
      getMedsAlexa({ amazon_id })
        .then(meds => {
          res.status(200).send({ meds });
        })
        .catch(next);
    };
};

exports.addMed = (req, res, next) => {
  postMed({ ...req.params, ...req.body })
    .then(med => {
      res.status(201).send({ med });
    })
    .catch(next);
};

exports.updateMed = (req, res, next) => {
  patchMed({ ...req.params, ...req.body })
    .then(patchedMed => {
      res.status(200).send({ patchedMed });
    })
    .catch(next);
};

exports.removeMed = (req, res, next) => {
  deleteMed({ ...req.params })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};

exports.takenMedsApp = (req, res, next) => {
  patchMedTakenApp({ ...req.params })
    .then(result => {
      console.log(result, 'after update');
      if(result.status) res.status(201).send({ ...result });
      else res.status(400).send({ ... result });
    });
};

exports.takenMedsAlexa = (req, res, next) => {

}
